import axios from 'axios';

const API_URL = 'https://bitcard-backend.vercel.app/api/cards/'; // Update with your backend API endpoint

// Get all cards
const getCards = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const getCardById = async (id, token) => {
  const response = await axios.get(`${API_URL}${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateCard = async (id, cardData, token) => {
  const response = await axios.put(`${API_URL}${id}`, cardData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
// Save a new card
const saveCard = async (token, cardData) => {
  const response = await axios.post(API_URL, cardData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getCards, saveCard };
