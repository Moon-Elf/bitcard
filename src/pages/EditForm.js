import React, { useState, useEffect } from 'react';
import { getCardById, updateCard } from '../api/cards';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditForm = () => {
  const { id } = useParams();
  const [formType, setFormType] = useState('person');
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const card = await getCardById(id, user.token);
        setFormData(card);
        setFields(card.additionalFields || []); // Load additional fields
        setFormType(card.type); // Set form type based on the card data
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

  const handleFieldChange = (index, e) => {
    const { name, value } = e.target;
    const newFields = fields.slice();
    newFields[index][name] = value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, { label: '', value: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const updatedCardData = {
        ...formData,
        additionalFields: fields,
      };
      await updateCard(id, updatedCardData, user.token);
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
        <div>
          <label>
            <input
              type="radio"
              value="person"
              checked={formType === 'person'}
              onChange={() => setFormType('person')}
            />
            Person
          </label>
          <label>
            <input
              type="radio"
              value="organization"
              checked={formType === 'organization'}
              onChange={() => setFormType('organization')}
            />
            Organization
          </label>
        </div>
        {formType === 'person' && (
          <div><label>Name:   </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name || ''}
              onChange={handleChange}
            /><br/>
            <label>Phone Number:   </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber || ''}
              onChange={handleChange}
            /><br/>
            <label>Email:   </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </div>
        )}
        {formType === 'organization' && (
          <div>
            <label>Company Name:   </label>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName || ''}
              onChange={handleChange}
            /><br/>
            <label>Contact No:   </label>
            <input
              type="text"
              name="contactNo"
              placeholder="Contact No."
              value={formData.contactNo || ''}
              onChange={handleChange}
            /><br/>
            <label>GST NO:   </label>
            <input
              type="text"
              name="gstNo"
              placeholder="GST NO."
              value={formData.gstNo || ''}
              onChange={handleChange}
            />
          </div>
        )}<br/>
            <label>Address:   </label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address || ''}
          onChange={handleChange}
        />
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              name="label"
              placeholder="Label"
              value={field.label || ''}
              onChange={(e) => handleFieldChange(index, e)}
            />
            <input
              type="text"
              name="value"
              placeholder="Value"
              value={field.value || ''}
              onChange={(e) => handleFieldChange(index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddField}>Add Field</button>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditForm;
