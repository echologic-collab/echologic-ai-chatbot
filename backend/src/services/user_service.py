from src.models.user_model import UserDb
from src.repository.user_repository import UserRepository
from src.services.base_service import BaseService


class UserService(BaseService):
    def __init__(self, user_repository: UserRepository):
        super().__init__(user_repository)
        self.user_repository = user_repository

    async def get_by_email(self, email: str) -> UserDb | None:
        return await self.user_repository.get_by_email(email)
