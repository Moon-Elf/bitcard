import React, { useEffect, useState } from 'react';
import { getCards } from '../api/cards';
import { logout } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        try {
          const fetchedCards = await getCards(user.token);
          setCards(fetchedCards);
        } catch (error) {
          console.error('Error fetching cards:', error);
        }
      } else {
        navigate('/login');
      }
    };

    fetchCards();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEdit = (cardId) => {
    navigate(`/edit/${cardId}`);
  };
  
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <button onClick={() => navigate('/add')}>Add New Card</button>
        <button onClick={() => navigate('/share')}>Share Cards</button>
      </div>
      <div>
        {cards.length > 0 ? (
          cards.map(card => (
            <div key={card._id} className="card">
              <h2>{card.type === 'person' ? card.name : card.companyName}</h2>
              <p>{card.type === 'person' ? `Phone: ${card.phoneNumber}` : `Contact No: ${card.contactNo}`}</p>
              <p>{card.type === 'person' ? `Email: ${card.email}` : `GST NO: ${card.gstNo}`}</p>
              <p>Address: {card.address}</p>
              <button onClick={() => handleEdit(card._id)}>Edit</button>
            </div>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
