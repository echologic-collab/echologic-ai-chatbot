from typing import TYPE_CHECKING, List, Optional

from sqlmodel import Field, Relationship

from src.core.enums import ConversationStatus
from src.models.base_model import BaseModel

if TYPE_CHECKING:
    from src.models.message_model import Message
    from src.models.user_model import UserDb


class Conversation(BaseModel, table=True):
    __tablename__ = "conversations"

    user_id: Optional[int] = Field(default=None, foreign_key="users.id")
    title: Optional[str] = Field(default="New Conversation")
    status: ConversationStatus = Field(
        default=ConversationStatus.ACTIVE, nullable=False
    )

    messages: List["Message"] = Relationship(back_populates="conversation")
    user: Optional["UserDb"] = Relationship(back_populates="conversations")
