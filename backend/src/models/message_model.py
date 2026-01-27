from typing import Optional
from datetime import datetime
from sqlmodel import Field, Relationship, SQLModel

class Message(SQLModel, table=True):
    """
    Represents individual messages within a conversation.
    Defined as an independent table for Alembic compatibility.
    """
    __tablename__ = "messages"
    
    # Primary Key definition
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Message content and sender identification
    content: str = Field(nullable=False)
    is_bot: bool = Field(default=False)
    
    # Timestamp for message tracking
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Foreign Key linking the message to a specific conversation
    conversation_id: Optional[int] = Field(default=None, foreign_key="conversations.id")
    
    # Relationship back to the Conversation model
    conversation: Optional["Conversation"] = Relationship(back_populates="messages")