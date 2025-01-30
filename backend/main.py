from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Routes.reply import reply_user
from Routes.summary import summarization
from Routes.improvements import improvements

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class textInput(BaseModel):
    transcript: str

@app.post("/convai/chat")
def voice_analyzer(text:textInput):
    audio_transcript = text.transcript
    response = reply_user(audio_transcript)
    return response

@app.get("/convai/summary")
def conv_summary():
    response = summarization()
    return response

@app.get("/convai/improvements")
def conv_summary():
    response = improvements()
    return response


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)