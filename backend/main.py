from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load environment variables before importing services that rely on them
load_dotenv()

from auth import verify_clerk_token
from ai_service import analyze_text, analyze_url, chat_with_ai
from db_service import log_scan_history, get_scan_history

app = FastAPI(title="PhishGuard AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, set to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeTextRequest(BaseModel):
    text: str

class AnalyzeUrlRequest(BaseModel):
    url: str

class ChatRequest(BaseModel):
    message: str
    history: list = []

@app.get("/")
def read_root():
    return {"message": "Welcome to PhishGuard AI API"}

@app.get("/secure-data")
def secure_data(user: dict = Depends(verify_clerk_token)):
    return {"message": "This is a secure endpoint", "user_id": user.get("sub")}

@app.post("/analyze/text")
async def api_analyze_text(
    request: AnalyzeTextRequest, 
    background_tasks: BackgroundTasks,
    user: dict = Depends(verify_clerk_token)
):
    result = await analyze_text(request.text)
    
    # Log to Supabase in the background to avoid blocking the response
    clerk_id = user.get("sub")
    if clerk_id:
        background_tasks.add_task(
            log_scan_history,
            clerk_id,
            "text",
            request.text,
            result.risk_level,
            result.explanation
        )
        
    return result

@app.post("/analyze/url")
async def api_analyze_url(
    request: AnalyzeUrlRequest, 
    background_tasks: BackgroundTasks,
    user: dict = Depends(verify_clerk_token)
):
    result = await analyze_url(request.url)
    
    # Log to Supabase in the background
    clerk_id = user.get("sub")
    if clerk_id:
        background_tasks.add_task(
            log_scan_history,
            clerk_id,
            "url",
            request.url,
            result.risk_level,
            result.explanation
        )
        
    return result

@app.post("/chat")
async def api_chat(
    request: ChatRequest,
    user: dict = Depends(verify_clerk_token)
):
    response_text = await chat_with_ai(request.message, request.history)
    return {"response": response_text}

@app.get("/history")
async def api_get_history(user: dict = Depends(verify_clerk_token)):
    clerk_id = user.get("sub")
    if not clerk_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    history = get_scan_history(clerk_id)
    return {"history": history}
