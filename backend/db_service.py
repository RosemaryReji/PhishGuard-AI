import os
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def log_scan_history(user_id: str, scan_type: str, content: str, risk_level: str, explanation: str):
    """
    Logs the scan result into the Supabase 'scan_history' table.
    We need to map the Clerk user_id to the Supabase internal UUID if needed,
    or we assume user_id is the clerk_id depending on our schema.
    Our schema uses UUID for ID and clerk_id as a text column.
    We should fetch the user UUID using the clerk_id first.
    """
    try:
        # 1. Get the internal Supabase user UUID based on the clerk_id
        user_response = supabase.table("users").select("id").eq("clerk_id", user_id).execute()
        
        if user_response.data and len(user_response.data) > 0:
            internal_user_id = user_response.data[0]["id"]
            
            # 2. Insert into scan_history
            supabase.table("scan_history").insert({
                "user_id": internal_user_id,
                "scan_type": scan_type,
                "content": content,
                "risk_level": risk_level,
                "explanation": explanation
            }).execute()
            print("Successfully logged scan history.")
        else:
            print("User not found in Supabase. Could not log scan history.")
    except Exception as e:
        print(f"Supabase Logging Error: {e}")

def get_scan_history(user_id: str):
    """
    Fetches the scan history for a user.
    """
    try:
        user_response = supabase.table("users").select("id").eq("clerk_id", user_id).execute()
        if user_response.data and len(user_response.data) > 0:
            internal_user_id = user_response.data[0]["id"]
            history_response = supabase.table("scan_history").select("*").eq("user_id", internal_user_id).order("created_at", desc=True).execute()
            return history_response.data
        return []
    except Exception as e:
        print(f"Supabase Fetch Error: {e}")
        return []
