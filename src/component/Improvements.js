import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Improvements.css';

export default function Improvements() {
    const [improve, setImprove] = useState("Nothing available");
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchImprovements = async () => {
        try {
            const response = await axios.get('http://localhost:8000/convai/improvements');
            setImprove(response.data); 
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching improvements:', error);
            setError('Failed to fetch improvements. Please try again later.'); 
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchImprovements();
    }, []);

    return (
        <div className="improvements-container">
            <div className="improvements-card">
                <h2 className="improvements-title">Conversation Improvements</h2>
                {loading ? (
                    <div className="loading-spinner"></div> 
                ) : error ? (
                    <p className="error-message">{error}</p>    
                ) : (
                    <p className="improvements-text">{improve}</p> 
                )}
            </div>
        </div>
    );
}