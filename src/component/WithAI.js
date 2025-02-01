import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import './styles/WithAI.css';
import axios from 'axios';

export default function WithAI() {
    const [isRecordingUser1, setIsRecordingUser1] = useState(false);
    const [isRecordingUser2, setIsRecordingUser2] = useState(false);
    const [user1Transcript, setUser1Transcript] = useState('');
    const [user2Transcript, setUser2Transcript] = useState('');
    const [user1Messages, setUser1Messages] = useState([]);
    const [user2Messages, setUser2Messages] = useState([]);
    const [responseMessages, setResponseMessages] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);
    const [recognitionUser1, setRecognitionUser1] = useState(null);
    const [recognitionUser2, setRecognitionUser2] = useState(null);

    const startDictation = (setTranscript, setIsRecording, setRecognition) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US'; // You can dynamically set the language based on your requirement

            recognition.onresult = async function (e) {
                const transcript = e.results[0][0].transcript;
                console.log("User said: ", transcript);
                recognition.stop();
                setTranscript(transcript); // Store the user's transcript in the respective state
                setIsRecording(false);
            };

            recognition.onerror = function (e) {
                if (e.error !== 'aborted') { // Ignore 'aborted' errors
                    alert("Error in voice recognition. Please try again.");
                    console.error('Speech Recognition Error:', e);
                }
                setIsRecording(false);
            };

            recognition.start();
            console.log("Recognition started", recognition);
            setRecognition(recognition);
        } else {
            alert("Speech recognition is not supported in this browser.");
            console.log("Speech recognition is not supported in this browser.");
        }
    };

    const startRecording = (setIsRecording, setTranscript, setRecognition) => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsRecording(true);
        startDictation(setTranscript, setIsRecording, setRecognition);
        const newTimeoutId = setTimeout(() => stopRecording(setIsRecording, setRecognition), 20000); // Automatically stop after 10 seconds
        setTimeoutId(newTimeoutId);
    };

    const stopRecording = (setIsRecording, recognition) => {
        if (recognition) {
            if (typeof recognition.stop === 'function') {
                recognition.stop();
            } else {
                console.error("recognition.stop is not a function. Recognition object:", recognition);
            }
        } else {
            console.error("Recognition is null or undefined.");
        }
        setIsRecording(false);
        if (timeoutId) clearTimeout(timeoutId);
    };

    const handleSubmit = async () => {
        if (!user1Transcript || !user2Transcript) {
            alert("Both users need to provide a transcript.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/convai/withAI', { user1: user1Transcript, user2: user2Transcript });
            console.log("Speech Recognition Response:", response);

            const timestamp = new Date().toISOString();
            
            setUser1Messages((prevMessages) => [...prevMessages, { text:"User1: " +  user1Transcript, timestamp }]); // Add user 1 message
            setUser2Messages((prevMessages) => [...prevMessages, { text:"User2: " + user2Transcript, timestamp }]); // Add user 2 message
            setResponseMessages((prevMessages) => [...prevMessages, { text: response.data, timestamp: new Date().toISOString() }]); // Add response message

            // Clear transcripts after submission
            setUser1Transcript('');
            setUser2Transcript('');
        } catch (error) {
            alert("Error in voice recognition. Please try again.");
            console.error('Error in voice analysis:', error);
        }
    };

    const combinedMessages = [...user1Messages, ...user2Messages].map((message, index) => ({
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
        <>
            <div className="chat-container">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-800 text-center">ConvAI</h1>
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
                <div className="different-voice">
                    <div className="record-btn-container">
                        {/* User 1 Record Button */}
                        <h1>User 1</h1>
                        <button
                            className={`record-btn ${isRecordingUser1 ? 'recording' : ''}`}
                            onClick={() => isRecordingUser1 ? stopRecording(setIsRecordingUser1, recognitionUser1) : startRecording(setIsRecordingUser1, setUser1Transcript, setRecognitionUser1)}
                        >
                            <FontAwesomeIcon icon={isRecordingUser1 ? faStop : faMicrophone} size="lg" />
                        </button>
                    </div>

                    <div className="record-btn-container">
                        {/* User 2 Record Button */}
                        <h1>User 2</h1>
                        <button
                            className={`record-btn ${isRecordingUser2 ? 'recording' : ''}`}
                            onClick={() => isRecordingUser2 ? stopRecording(setIsRecordingUser2, recognitionUser2) : startRecording(setIsRecordingUser2, setUser2Transcript, setRecognitionUser2)}
                        >
                            <FontAwesomeIcon icon={isRecordingUser2 ? faStop : faMicrophone} size="lg" />
                        </button>
                    </div>
                </div>
                <div className="submit-container">
                    <button className="submit-btn" onClick={handleSubmit}>
                        Submit Transcripts
                    </button>
                </div>
            </div>
        </>
    );
}