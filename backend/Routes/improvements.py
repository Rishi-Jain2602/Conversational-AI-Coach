from Model.memory import memory
from Model.mistral import llm
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser

f = open("Routes/Prompts/improvement.txt", "r")
imp_prompt = f.read()

prompt = ChatPromptTemplate.from_messages(
    [
        ("system",f"{imp_prompt}"),
        MessagesPlaceholder(variable_name="history"),
        ("human","You need to suggest me improvements based on my conversation with you or ai bot")
    ]
)
chain = prompt | llm | StrOutputParser()

def improvements():
    if not memory.chat_memory.messages:
        return "No conversation history available."
    response = chain.invoke(
        {
            "history":memory.chat_memory.messages,
        }
    )

    return response