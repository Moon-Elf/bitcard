const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['person', 'organization'],
    required: true,
  },
  name: String,
  phoneNumber: String,
  email: String,
  address: String,
  companyName: String,
  contactNo: String,
  gstNo: String,
  additionalFields: [
    {
      label: String,
      value: String,
    },
  ],
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
