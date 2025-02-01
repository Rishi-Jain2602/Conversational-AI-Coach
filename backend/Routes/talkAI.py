from Model.mistral import llm
from Model.memory import memory
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser


f = open("Routes/Prompts/talkAI.txt", "r")
talkAI_prompt = f.read()


prompt = ChatPromptTemplate.from_messages(
    [
        ("system",f"{talkAI_prompt}"),
        MessagesPlaceholder(variable_name="history"),
        ("human","{query}")
    ]
)
chain = prompt | llm | StrOutputParser()


def reply_user(query):
    memory.chat_memory.add_user_message(query)
    response = chain.invoke(
        {
            "history":memory.chat_memory.messages,
            "query": query    
        }
    )
    memory.chat_memory.add_ai_message(response)
    return response