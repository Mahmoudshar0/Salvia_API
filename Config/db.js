require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4005;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
  const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.pcgeeqe.mongodb.net/greenUp?retryWrites=true&w=majority&appName=Cluster0`);
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      throw err;
    }
  };

  module.exports = connectDB; 