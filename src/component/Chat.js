import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import './styles/Chat.css';
import axios from 'axios';

export default function Chat() {
    const [isRecording, setIsRecording] = useState(false);
    const [userMessages, setUserMessages] = useState([]);
    const [responseMessages, setResponseMessages] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);
    // const mediaRecorder = useRef(null);

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
                console.log("Transcript: "+transcript)
                
                // Send the transcript to the backend (voice_path)
                try {
                    const response = await axios.post('http://localhost:8000/convai/chat', { transcript: transcript });
                    console.log("Speech Recognition Response:", response);
                    
                    setUserMessages((prevMessages) => [...prevMessages, transcript]);  // Add transcript to the user messages
                    setResponseMessages((prevMessages) => [...prevMessages, response.data]);  // Add API response
                } catch (error) {
                    console.error('Error in voice analysis:', error);
                }
            };

            recognition.onerror = function (e) {
                recognition.stop();
                console.error('Speech Recognition Error:', e);
            };
        } else {
            console.log("Speech recognition is not supported in this browser.");
        }
    };

    const startRecording = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsRecording(true);
        startDictation();
        // Simulate media recorder setup here
        const newTimeoutId = setTimeout(stopRecording, 5000); // Auto stop after 5 secs
        setTimeoutId(newTimeoutId);
    };

    const stopRecording = async () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsRecording(false);
        console.log("Stopped recording.");
    };

    const combinedMessages = userMessages.map((message, index) => ({
        type: 'user',
        text: message,
        id: `user-${index}`,
    })).concat(responseMessages.map((message, index) => ({
        type: 'response',
        text: message,
        id: `response-${index}`,
    })));

    // Sort messages in ascending order
    const sortedMessages = combinedMessages.sort((a, b) => a.id.localeCompare(b.id));

    return (
        <div className="chat-container">
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-800 text-center">ConvAI</h1>
            </div>
            <div className="chat-box">
                {/* Messages */}
                {sortedMessages.map((message) => (
                    <div key={message.id} className={`message ${message.type}-message`}>
                        <div className={`message-text ${message.type}-text`}>
                            {message.text}
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