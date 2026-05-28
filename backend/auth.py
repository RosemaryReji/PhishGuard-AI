import os
import jwt
from jwt import PyJWKClient
from fastapi import HTTPException, Security, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def get_clerk_jwks_url():
    # In a real app, you get the issuer URL from Clerk Dashboard
    issuer = os.environ.get("CLERK_ISSUER_URL", "https://your-clerk-issuer-url.clerk.accounts.dev")
    return f"{issuer}/.well-known/jwks.json"

async def verify_clerk_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        # Fetch JWKS
        jwks_client = PyJWKClient(get_clerk_jwks_url())
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        
        # Verify Token
        data = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            audience=os.environ.get("CLERK_AUDIENCE", "your-audience"),
            issuer=os.environ.get("CLERK_ISSUER_URL")
        )
        return data
    except jwt.PyJWKClientError as e:
        raise HTTPException(status_code=401, detail="Unable to fetch JWKS")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail="Invalid token")
