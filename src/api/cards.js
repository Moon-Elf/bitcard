import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cards/'; // Update with your backend API endpoint

// Get all cards
const getCards = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
