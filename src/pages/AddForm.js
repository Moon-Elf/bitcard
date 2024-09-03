import React, { useState } from 'react';
import { saveCard } from '../api/cards'; // We'll implement this API call next

const AddForm = () => {
  const [formType, setFormType] = useState('person');
  const [fields, setFields] = useState([]);  // Initialize with an empty array
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    companyName: '',
    contactNo: '',
    gstNo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddField = () => {
    setFields([...fields, { label: '', value: '' }]);
  };

  const handleFieldChange = (index, e) => {
    const { name, value } = e.target;
    const newFields = [...fields];
    newFields[index][name] = value;
    setFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    const cardData = {
      userId: user._id,
      type: formType,
      ...formData,
      additionalFields: fields,
    };

    try {
      await saveCard(user.token, cardData);
      alert('Card saved successfully!');
      window.location.href = '/'; // Redirect to dashboard
    } catch (error) {
      alert('Error saving card');
    }
  };

  return (
    <div>
      <h1>Add New Card</h1>
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
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        )}
        {formType === 'organization' && (
          <div>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contactNo"
              placeholder="Contact No."
              value={formData.contactNo}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="gstNo"
              placeholder="GST NO."
              value={formData.gstNo}
              onChange={handleInputChange}
            />
          </div>
        )}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              name="label"
              placeholder="Label"
              value={field.label}
              onChange={(e) => handleFieldChange(index, e)}
            />
            <input
              type="text"
              name="value"
              placeholder="Value"
              value={field.value}
              onChange={(e) => handleFieldChange(index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddField}>Add Field</button>
        <button type="submit">Save Card</button>
      </form>
    </div>
  );
};

export default AddForm;
