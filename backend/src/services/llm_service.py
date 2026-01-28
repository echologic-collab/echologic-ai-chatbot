import os

from langchain.agents import create_agent
from langchain.agents.middleware import SummarizationMiddleware
from langchain.chat_models import init_chat_model

from src.core.config import Config


class LLMService:
    def __init__(self, config: Config):
        self.config = config
        self.model = init_chat_model(config.MODEL_NAME)
        os.environ["GOOGLE_API_KEY"] = config.GOOGLE_API_KEY
        self.agent = create_agent(
            model=self.model,
            tools=[],
            checkpointer=None,
            debug=True if self.config.DEBUG else False,
            middleware=[
                SummarizationMiddleware(
                    model=self.model,
                    trigger=("tokens", 4000),
                    keep=("messages", 10),
                ),
            ],
        )

    def generate_response(self, message: str) -> str:
        response = self.agent.invoke(
            {"messages": [{"role": "user", "content": message}]}
        )
        return response["messages"][-1].content
