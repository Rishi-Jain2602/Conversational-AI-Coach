from Routes.reply import memory
from Model.mistral import llm
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_messages(
    [
        ("system","You are provided with conversation history of user and AI Bot. Your job is to summarize the Conversation."),
        MessagesPlaceholder(variable_name="history"),
        ("human", "Please provide a summary of the above conversation.")
    ]
)
chain = prompt | llm | StrOutputParser()

def summarization():
    response = chain.invoke(
        {
            "history":memory.chat_memory.messages,
        }
    )
    return response