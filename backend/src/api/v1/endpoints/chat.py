from typing import Annotated

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends

from src.core.container import Container
from src.core.exceptions import NotFoundError, ValidationError
from src.core.security import get_current_user
from src.schemas.chat_schema import ChatRequest, ChatResponse
from src.schemas.user_schema import TokenData
from src.services.user_service import UserService

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
@inject
async def chat(
    chat_request: ChatRequest,
    current_user: Annotated[TokenData, Depends(get_current_user)],
    user_service: Annotated[UserService, Depends(Provide[Container.user_service])],
):
    """
    Chat endpoint with authentication.
    Returns an echo of the user's message with their name.

    Raises:
        ValidationError: If message is empty or invalid
        NotFoundError: If authenticated user not found in database
    """
    # Validate message
    if not chat_request.message or not chat_request.message.strip():
        raise ValidationError(detail="Message cannot be empty")

    # Get user details from database
    user = await user_service.get_by_email(current_user.email)

    if not user:
        raise NotFoundError(detail=f"User {current_user.email} not found")

    # Simple echo response with user's name
    user_name = user.name if user.name else "User"
    response_text = f"Hello {user_name}! You said: {chat_request.message}"

    return ChatResponse(
        user_email=current_user.email,
        user_name=user_name,
        message=chat_request.message,
        response=response_text,
    )
