from Model.mistral import llm
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_messages(
    [
        ("system","You are an AI assistant designed to engage in natural, human-like conversations. Your task is to communicate effectively with users while suggesting improvements to their communication when needed. Whenever you notice grammatical, vocabulary, or clarity issues, offer gentle suggestions to enhance their expressions. However, corrections or suggestions should only be made when they are helpful for improving the flow or understanding of the conversation. Keep your tone supportive and encouraging, maintaining a natural and smooth interaction throughout."),
        MessagesPlaceholder(variable_name="history"),
        ("human","{query}")
    ]
)
memory = ConversationBufferMemory(memory_key="chat_history")

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