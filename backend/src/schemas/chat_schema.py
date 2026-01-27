from typing import Optional

from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    user_email: str
    user_name: Optional[str] = None
    message: str
    response: str
