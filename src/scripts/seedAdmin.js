const path = require('path');
// Load .env from the root of the project (2 levels up from src/scripts)
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const adminEmail = 'admin@brahma.ai';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin already exists. You can log in with admin@brahma.ai / admin123');
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash('admin123', 10);
    
    await User.create({
      email: adminEmail,
      passwordHash,
      name: 'Super Admin',
      role: 'admin',
      status: 'active',
    });

    console.log('Admin created successfully.');
    console.log('Email: admin@brahma.ai');
    console.log('Password: admin123');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();