from typing import List, Optional
from sqlmodel import Field, Relationship
from src.models.base_model import BaseModel

class Conversation(BaseModel, table=True):
    __tablename__ = "conversations"
    
    user_id: Optional[int] = Field(default=None, foreign_key="users.id")
    
    # Relación con mensajes
    messages: List["Message"] = Relationship(back_populates="conversation")