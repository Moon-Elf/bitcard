const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'https://bitcard.vercel.app',
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

const cardRoutes = require('./routes/cardRoutes');

app.use('/api/cards', cardRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/', (req, res) => {
  res.send('Bitcard API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
