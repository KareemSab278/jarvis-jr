from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import requests # dont need multithreading so no need for httpx. its only for personal use lol
from fastapi.middleware.cors import CORSMiddleware

api = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str
    model: str = None

@api.get("/")
async def index():
    return {"message": "Local LLM API is running."}

@api.post("/api/chat")
async def prompt_to_chat(chat: ChatRequest):
    prompt = chat.prompt
    model = chat.model
    try:
        response = requests.post(
            "http://localhost:11434/api/chat",
            json={
                "model": model if model is not None else "qwen2.5-coder:3b",
                "stream": False,
                "messages": [
                    {"role": "system", "content": "You are a precise coding assistant. Give the solution and a brief explanation. Speed and accuracy are important."},
                    {"role": "user", "content": prompt}
                ]
            },
            timeout=60
        )
        response.raise_for_status()
        content = response.json()["message"]["content"]
        return {"content": content}
    except requests.exceptions.RequestException as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    except KeyError:
        return JSONResponse(status_code=500, content={"error": "Unexpected response format", "response": response.text})
    
# this should technically work now... python -m uvicorn api:api --reload