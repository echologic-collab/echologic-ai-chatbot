from typing import List, Optional
from sqlmodel import Field, Relationship
from .base_model import BaseModel

class Conversation(BaseModel, table=True):
    """
    Represents a chat session between a user and the AI.
    Inherits id, uuid, created_at, and updated_at from BaseModel.
    """
    __tablename__ = "conversations"
    
    # Audit fields (id, uuid, timestamps) are handled by the parent class
    
    title: Optional[str] = Field(default="New Conversation")
    status: str = Field(default="active")
    
    # Foreign Key pointing to the users table
    user_id: Optional[int] = Field(default=None, foreign_key="users.id")
    
    # One-to-Many relationship: One conversation has many messages
    messages: List["Message"] = Relationship(back_populates="conversation")