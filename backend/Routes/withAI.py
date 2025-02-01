from Model.mistral import llm
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
from Model.memory import memory
from langchain_core.output_parsers import StrOutputParser

f = open("Routes/Prompts/withAI.txt", "r")
withAI_prompt = f.read()


prompt = ChatPromptTemplate.from_messages(
    [
        ("system",f"{withAI_prompt}"),
        MessagesPlaceholder(variable_name="history"),
        ("human"," User 1: {query1} and User2 : {query2}")
    ]
)

chain = prompt | llm | StrOutputParser()


def Analyze_users(query1,query2):
    memory.chat_memory.add_user_message("User 1:"+query1)
    memory.chat_memory.add_user_message("User 2:"+query2)

    response = chain.invoke(
        {
            "history":memory.chat_memory.messages,
            "query1": query1,
            "query2": query2    
        }
    )
    memory.chat_memory.add_ai_message(response)
    return response