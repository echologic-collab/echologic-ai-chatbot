from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from src.core.config import config
from src.schemas.user_schema import TokenData

# HTTPBearer for easier token pasting in Swagger UI
security = HTTPBearer()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Cache for JWKS
jwks_cache = {}


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)
    return encoded_jwt


async def get_jwks() -> dict:
    global jwks_cache
    if jwks_cache:
        return jwks_cache

    try:
        import httpx

        async with httpx.AsyncClient() as client:
            response = await client.get(config.JWKS_URL)
            response.raise_for_status()
            jwks_cache = response.json()
            return jwks_cache
    except Exception as e:
        print(f"Error fetching JWKS: {e}")
        return {}


async def get_current_user(
    token: Annotated[HTTPAuthorizationCredentials, Depends(security)],
) -> TokenData:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        if config.JWKS_URL:
            # 1. Get header for kid
            unverified_header = jwt.get_unverified_header(token.credentials)
            kid = unverified_header.get("kid")

            # 2. Fetch JWKS
            jwks = await get_jwks()

            # 3. Find key
            rsa_key = {}
            for key in jwks.get("keys", []):
                if key.get("kid") == kid:
                    rsa_key = key
                    break

            if rsa_key:
                payload = jwt.decode(
                    token.credentials,
                    rsa_key,
                    algorithms=["RS256"],
                    audience=config.AUTH_AUDIENCE,
                )
            else:
                # Fallback to local secret if no matching key found (legacy)
                payload = jwt.decode(
                    token.credentials, config.SECRET_KEY, algorithms=[config.ALGORITHM]
                )

        else:
            payload = jwt.decode(
                token.credentials, config.SECRET_KEY, algorithms=[config.ALGORITHM]
            )

        email: str = payload.get("email") or payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)

    except JWTError:
        raise credentials_exception

    return token_data
