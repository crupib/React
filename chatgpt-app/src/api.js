// src/api.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const openaiApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

export const fetchChatGPTResponse = async (prompt) => {
  const response = await openaiApi.post('/chat/completions', {
    model: 'gpt-4', // or 'gpt-3.5-turbo'
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1000, // adjust this as needed
  });

  return response.data;
};


