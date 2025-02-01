from Model.memory import memory
from Model.mistral import llm
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser

f = open("Routes/Prompts/Summary.txt", "r")
summary_prompt = f.read()

prompt = ChatPromptTemplate.from_messages(
    [
        ("system",f"{summary_prompt}"),
        MessagesPlaceholder(variable_name="history"),
        ("human", "Please provide a summary of the above conversation.")
    ]
)
chain = prompt | llm | StrOutputParser()

def summarization():
    if not memory.chat_memory.messages:
        return "You haven't had any conversations with AI."
    response = chain.invoke(
        {
            "history":memory.chat_memory.messages,
        }
    )
    return response