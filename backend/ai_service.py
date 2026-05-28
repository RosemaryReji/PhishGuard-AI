import os
from google import genai
from google.genai import types
from pydantic import BaseModel
import json
import re

# Initialize the new Google GenAI client
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
MODEL_ID = 'gemini-2.5-flash'

class AnalysisResult(BaseModel):
    risk_level: str
    explanation: str

SYSTEM_PROMPT_TEXT = """
You are PhishGuard AI, a cybersecurity expert assistant.
Analyze the following text message or email and determine if it is a phishing attempt, scam, or safe.
Classify the risk level as strictly one of: 'Low', 'Medium', 'High', or 'Critical'.
Provide a concise, beginner-friendly explanation of why you gave this rating, highlighting any red flags (e.g., urgency, suspicious links, requests for personal info).
Output strictly in JSON format: {"risk_level": "...", "explanation": "..."}
"""

SYSTEM_PROMPT_URL = """
You are PhishGuard AI, a cybersecurity expert assistant.
Analyze the following URL and determine if it is likely malicious, a phishing site, or safe.
Classify the risk level as strictly one of: 'Low', 'Medium', 'High', or 'Critical'.
Provide a concise, beginner-friendly explanation of why you gave this rating, highlighting any red flags (e.g., typosquatting, suspicious TLDs, lack of HTTPS context).
Output strictly in JSON format: {"risk_level": "...", "explanation": "..."}
"""

SYSTEM_PROMPT_CHAT = """
You are PhishGuard AI, a friendly and expert cybersecurity assistant.
Your goal is to help users understand online safety, detect scams, and learn about cybersecurity best practices.
Keep your answers concise, easy to understand, and helpful. Do not use overly technical jargon unless you explain it.
"""

def extract_json(text: str):
    """Utility to clean markdown JSON formatting if the model wraps it."""
    match = re.search(r'\{.*\}', text, re.DOTALL)
    if match:
        return match.group(0)
    return text

async def analyze_text(text: str) -> AnalysisResult:
    try:
        response = await client.aio.models.generate_content(
            model=MODEL_ID,
            contents=text,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT_TEXT,
                response_mime_type="application/json"
            )
        )
        content = extract_json(response.text)
        data = json.loads(content)
        return AnalysisResult(
            risk_level=data.get("risk_level", "Medium"),
            explanation=data.get("explanation", "Could not fully analyze.")
        )
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return AnalysisResult(risk_level="Medium", explanation="Error connecting to AI service.")

async def analyze_url(url: str) -> AnalysisResult:
    try:
        response = await client.aio.models.generate_content(
            model=MODEL_ID,
            contents=url,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT_URL,
                response_mime_type="application/json"
            )
        )
        content = extract_json(response.text)
        data = json.loads(content)
        return AnalysisResult(
            risk_level=data.get("risk_level", "Medium"),
            explanation=data.get("explanation", "Could not fully analyze.")
        )
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return AnalysisResult(risk_level="Medium", explanation="Error connecting to AI service.")

async def chat_with_ai(message: str, history: list = None) -> str:
    gemini_history = []
    if history:
        # Ensure it starts with user
        while history and history[0].get("role") != "user":
            history = history[1:]
            
        for msg in history:
            role = "model" if msg.get("role") == "assistant" else "user"
            # Prevent consecutive same-role messages
            if gemini_history and getattr(gemini_history[-1], 'role', None) == role:
                continue
            gemini_history.append(types.Content(role=role, parts=[types.Part.from_text(text=msg.get("content", ""))]))
            
    try:
        chat = client.aio.chats.create(
            model=MODEL_ID,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT_CHAT,
            ),
            history=gemini_history
        )
        response = await chat.send_message(message)
        return response.text
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return "I'm having trouble connecting to my neural network right now. Please try again later."
