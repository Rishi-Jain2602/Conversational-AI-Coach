import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import './styles/Summary.css';

export default function Summary() {
    const [summary, setSummary] = useState("Nothing available");
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const isFetched = useRef(false); 
    
    const fetchImprovements = async () => {
        try {
            const response = await axios.get('http://localhost:8000/convai/summary');
            setSummary(response.data); 
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching Summary:', error);
            setError('Failed to fetch Summary. Please try again later.'); 
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (!isFetched.current) {
            fetchImprovements();
            isFetched.current = true; 
        }
    }, []);

    return (
        <div className="summary-container">
            <div className="summary-card">
                <h2 className="summary-title">Summary</h2>
                {loading ? (
                    <div className="loading-spinner"></div> 
                ) : error ? (
                    <p className="error-message">{error}</p>    
                ) : (
                    <p className="summary-text">{summary}</p> 
                )}
            </div>
        </div>
    );
}