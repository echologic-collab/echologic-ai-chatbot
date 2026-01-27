from typing import Annotated

from fastapi import APIRouter, Depends

from src.core.security import get_current_user
from src.schemas.user_schema import TokenData

router = APIRouter(prefix="/chat", tags=["chat"])


@router.get("/", response_model=dict)
async def chat(
    current_user: Annotated[TokenData, Depends(get_current_user)],
    user_query: str,
):
    """
    Chat endpoint.
    """
    return {"response": user_query}
