import axios from 'axios';

const API_URL = 'https://bitcard-backend.vercel.app/api/auth/';

// Login function example
const login = async (userData) => {
    try {
        const response = await axios.post(API_URL + 'login', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Registration function example
const register = async (userData) => {
    try {
        const response = await axios.post(API_URL + 'register', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        throw error;
    }
};


// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

export { register, login, logout };
