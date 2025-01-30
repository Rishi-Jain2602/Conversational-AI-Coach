from Model.mistral import llm
from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_messages(
    [
        ("system","You are provided with user query. And you have tell mistake in the sentence and make it grammetical correct, improve vocabulary, etc"),
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