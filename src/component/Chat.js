import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import './styles/Chat.css';
import axios from 'axios';

export default function Chat() {
    const [isRecording, setIsRecording] = useState(false);
    const [userMessages, setUserMessages] = useState([]);
    const [responseMessages, setResponseMessages] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);

    const startDictation = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.lang = 'en-US'; // You can dynamically set the language based on your requirement
            recognition.start();

            recognition.onresult = async function (e) {
                const transcript = e.results[0][0].transcript;
                recognition.stop();
                const timestamp = new Date().toISOString();
                                
                try {
                    const response = await axios.post('http://localhost:8000/convai/chat', { transcript: transcript });
                    console.log("Speech Recognition Response:", response);
                    
                    setUserMessages((prevMessages) => [...prevMessages,  { text: transcript, timestamp }]);  // Add transcript to the user messages
                    setResponseMessages((prevMessages) => [...prevMessages, { text: response.data, timestamp: new Date().toISOString() }]);  // Add API response
                } catch (error) {
                    alert("Error in voice recognition. Please try again.");
                    console.error('Error in voice analysis:', error);
                }
            };
            
            recognition.onerror = function (e) {
                recognition.stop();
                alert("Error in voice recognition. Please try again.");
                console.error('Speech Recognition Error:', e);
            };
        } else {
            alert("Speech recognition is not supported in this browser.");
            console.log("Speech recognition is not supported in this browser.");
        }
    };

    const startRecording = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsRecording(true);
        startDictation();
        const newTimeoutId = setTimeout(stopRecording, 10000); 
        setTimeoutId(newTimeoutId);
    };

    const stopRecording = async () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsRecording(false);
        console.log("Stopped recording.");
    };

    const combinedMessages = userMessages.map((message, index) => ({
        type: 'user',
        text: message.text,
        timestamp: message.timestamp,
        id: `user-${index}`,
    })).concat(responseMessages.map((message, index) => ({
        type: 'response',
        text: message.text,
        timestamp: message.timestamp,
        id: `response-${index}`,
    })));

    // Sort messages in ascending order
    const sortedMessages = combinedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const formatImprovementText = (text) => {
        return text.split('\n').map((line, index) => {
            const formattedLine = line.split('**').map((part, partIndex) => {
                return partIndex % 2 === 0 ? part : <strong key={partIndex}>{part}</strong>;
            });
            return <div key={index}>{formattedLine}</div>;
        });
    };

    return (
        <div className="chat-container">
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-800 text-center ">ConvAI</h1>
            </div>
            <div className="chat-box">
                {/* Messages */}
                {sortedMessages.map((message) => (
                    <div key={message.id} className={`message ${message.type}-message`}>
                        <div className={`message-text ${message.type}-text`}>
                            <p>{formatImprovementText(message.text)}</p>
                            <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="record-btn-container">
                {/* Manual Record Button */}
                <button
                    className={`record-btn ${isRecording ? 'recording' : ''}`}
                    onClick={isRecording ? stopRecording : startRecording}
                >
                    <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} size="lg" />
                </button>
            </div>
        </div>
    );
}