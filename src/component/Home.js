import React from 'react';
import './styles/Home.css'; // Import the CSS file for styling

export default function Home() {
  return (
    <div className="home-container">
      <div className="welcome-text">
        <h1>Welcome to ConvAI</h1>
        <p>
          Welcome to <strong>ConvAI</strong>, an AI-powered platform designed to enhance your communication skills. Whether you're looking to improve your speaking abilities, engage in intelligent conversations, or receive real-time feedback on your dialogue, ConvAI has got you covered.
        </p>
        <p>
          Dive into personalized conversations with AI, where it listens, responds, and helps you express yourself more effectively. With features like <strong>AI Voice Chat and AI-Powered Duo Chat</strong>, you can practice speaking, get instant suggestions, and elevate your conversational skills to the next level.
        </p>
        <p>
          Join us on this journey to unlock the full potential of your communication, and let AI guide you every step of the way.
        </p>
      </div>
    </div>
  );
}