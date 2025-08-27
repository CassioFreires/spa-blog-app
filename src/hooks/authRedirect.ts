import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function useAuthRedirect() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const timeoutRef = useRef<number | null>(null);

    const redirect = (path: string, msg: string, delay = 3000) => {
        setMessage(msg);
        timeoutRef.current = window.setTimeout(() => navigate(path), delay);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, []);

    return { isAuthenticated, message, redirect };
}
