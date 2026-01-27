from fastapi import APIRouter

router = APIRouter(prefix="/chat", tags=["chat"])


@router.get("/", response_model=dict)
async def chat(
    # current_user: Annotated[TokenData, Depends(get_current_user)],
    user_query: str,
):
    """
    Chat endpoint.
    """
    return {"response": user_query}
