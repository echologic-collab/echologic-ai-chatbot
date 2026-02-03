from typing import Optional
from sqlmodel import Field, Relationship
from .base_model import BaseModel

class Message(BaseModel, table=True):
    """
    Represents individual messages within a chat.
    Inherits id, uuid, created_at, and updated_at from BaseModel.
    """
    __tablename__ = "messages"
    
    # Message content (cannot be empty)
    content: str = Field(nullable=False)
    
    # Standardized role: 'user', 'assistant', or 'system'
    # This replaces the old 'is_bot' boolean for better flexibility
    role: str = Field(default="user", nullable=False) 
    
    # Foreign Key linking the message to a specific conversation
    conversation_id: Optional[int] = Field(default=None, foreign_key="conversations.id")
    
    # Relationship back to the Conversation model for ORM access
    conversation: Optional["Conversation"] = Relationship(back_populates="messages")