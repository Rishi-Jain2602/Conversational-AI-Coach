from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Routes.talkAI import reply_user
from Routes.summary import summarization
from Routes.improvements import improvements
from Routes.withAI import Analyze_users
from Model.memory import memory
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class talkAIInput(BaseModel):
    transcript: str

@app.post("/convai/talkAI")
def voice_analyzer(text:talkAIInput):
    audio_transcript = text.transcript
    response = reply_user(audio_transcript)
    return response

class withAIInput(BaseModel):
    user1: str
    user2: str

@app.post("/convai/withAI")
def voice_analyzer(query:withAIInput):
    user1 = query.user1
    user2 = query.user2
    response = Analyze_users(user1,user2)
    return response

@app.get("/convai/summary")
def conv_summary():
    response = summarization()
    return response

@app.get("/convai/improvements")
def conv_summary():
    response = improvements()
    return response

@app.get("/convai/memory")
def clear_memory():
    if not memory.chat_memory.messages:
        return "Memory is already cleared"
    
    memory.chat_memory.clear()
    return "memory is cleared"


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)