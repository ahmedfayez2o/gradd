import React from 'react';
import Button from '../Button/Button';
import './ErrorMessage.css';

const ErrorMessage = ({ 
    title = 'Oops! Something went wrong', 
    message = 'An error occurred while processing your request', 
    onRetry,
    showRetry = true
}) => {
    return (
        <div className="error-container">
            <div className="error-content">
                <h2>{title}</h2>
                <p>{message}</p>
                {showRetry && onRetry && (
                    <Button 
                        variant="primary" 
                        onClick={onRetry}
                    >
                        Try Again
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;