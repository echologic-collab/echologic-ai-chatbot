from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.models.message_model import Message
from src.models.conversation_model import Conversation

class ChatRepository:
    """
    Repository to handle all database operations for Chat and Messages.
    Uses AsyncSession to maintain non-blocking I/O operations.
    """

    @staticmethod
    async def save_message(session: AsyncSession, conversation_id: int, content: str, is_bot: bool = False) -> Message:
        """
        Saves a user or bot message to the messages table.
        This fulfills the 'Save to DB' sub-task.
        """
        new_message = Message(
            content=content,
            is_bot=is_bot,
            conversation_id=conversation_id
        )
        session.add(new_message)
        await session.commit()
        await session.refresh(new_message)
        return new_message

    @staticmethod
    async def get_chat_history(session: AsyncSession, conversation_id: int, limit: int = 10) -> List[Message]:
        """
        Retrieves the last N messages for a specific conversation.
        Necessary for providing context to the Gemini API.
        """
        # Select messages for the conversation, ordered by most recent
        query = (
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.desc())
            .limit(limit)
        )
        
        result = await session.execute(query)
        messages = result.scalars().all()
        
        # We reverse them to return chronological order (oldest to newest)
        return list(reversed(messages))