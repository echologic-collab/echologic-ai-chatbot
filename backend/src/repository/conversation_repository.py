from typing import Any, Callable

from src.models.conversation_model import ConversationDb
from src.repository.base_repository import BaseRepository


class ConversationRepository(BaseRepository):
    """Conversation repository using ConversationDb model with BaseRepository pattern."""

    def __init__(self, session_factory: Callable[..., Any]):
        super().__init__(session_factory, ConversationDb)

    def get_existing_conversation(
        self, conversation_uuid: str, user_id: int
    ) -> ConversationDb | None:
        search_result = self.read_by_options(
            schema=ConversationDb(uuid=conversation_uuid, user_id=user_id)
        )
        if search_result["founds"]:
            conversation = search_result["founds"][0]
            return conversation
        return None
