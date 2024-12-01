import { useState } from 'react';
import axiosInstance from "../api/axiosInstance.js";

const useChatbot = (classId) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (text) => {
        const userMessage = { role: 'user', content: text };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await axiosInstance.post(`/chat`, { prompt: text, history: messages }, { params: { class_id: classId } });
            const botResponse = { role: 'assistant', content: response.data.body };
            setMessages((prev) => [...prev, botResponse]);
        } catch {
            const errorMessage = { role: 'assistant', content: 'Error: Unable to get response from the server.' };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return { messages, sendMessage, loading };
};

export default useChatbot;