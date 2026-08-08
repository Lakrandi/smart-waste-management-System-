const mongoose = require('mongoose');
const dns = require('dns');

//Configuring Node.js to use Google DNS directly
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Cloud Connected Successfully!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;