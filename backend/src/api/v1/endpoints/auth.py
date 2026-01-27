from typing import Annotated

from fastapi import APIRouter, Depends

from src.core.security import get_current_user
from src.schemas.user_schema import TokenData

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/verify", response_model=TokenData)
async def verify_token(
    current_user: Annotated[TokenData, Depends(get_current_user)],
):
    """
    Verify the validity of the access token.
    If valid, returns the token data (user email/id).
    """
    return current_user
