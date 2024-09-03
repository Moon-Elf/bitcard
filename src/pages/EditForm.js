import React, { useState, useEffect } from 'react';
import { getCardById, updateCard } from '../api/cards';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const card = await getCardById(id, user.token);
        setFormData(card);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await updateCard(id, formData, user.token);
      alert('Card updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating card:', error);
      alert('Failed to update card');
    }
  };

  return (
    <div>
      <Link to="/"><button type='button'>Back</button></Link>
      <h1>Edit Card</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber || ''}
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          value={formData.address || ''}
          placeholder="Address"
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditForm;
