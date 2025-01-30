from Routes.reply import memory
from Model.mistral import llm
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_messages(
    [
        ("system","Suggest improvement to the users based on the conversation between AI and user."),
        MessagesPlaceholder(variable_name="history"),
        ("human","You need to suggest me improvements based on my conversation with you or ai bot")
    ]
)
chain = prompt | llm | StrOutputParser()

def improvements():
    if not memory.chat_memory.messages:
        return "No conversation history available."
    
    # if memory.chat_memory.messages and memory.chat_memory.messages[-1].type == "ai":
    #     # Remove the last AI message if it exists
    #     memory.chat_memory.messages.pop()
    response = chain.invoke(
        {
            "history":memory.chat_memory.messages,
        }
    )

    return response