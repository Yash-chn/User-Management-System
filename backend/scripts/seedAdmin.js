import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/user_management_db';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB database successfully.');

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        status: 'active',
      });
      console.log(`[Seed] Initial Admin account created:`);
      console.log(`       Name:     ${admin.name}`);
      console.log(`       Email:    ${admin.email}`);
      console.log(`       Role:     ${admin.role}`);
      console.log(`       Status:   ${admin.status}`);
    } else {
      console.log(`[Seed] Admin account already exists: ${admin.email}`);
    }

    // Seed realistic sample users for demonstration if missing
    console.log('[Seed] Ensuring sample users exist for demonstration...');
    const sampleUsers = [
      {
        name: 'Sarah Connor',
        email: 'sarah.connor@cyberdyne.io',
        password: 'Password@123',
        role: 'user',
        status: 'active',
      },
      {
        name: 'Michael Scott',
        email: 'michael.scott@dundermifflin.com',
        password: 'Password@123',
        role: 'user',
        status: 'active',
      },
      {
        name: 'Dwight Schrute',
        email: 'dwight.schrute@dundermifflin.com',
        password: 'Password@123',
        role: 'user',
        status: 'active',
      },
      {
        name: 'Pam Beesly',
        email: 'pam.beesly@dundermifflin.com',
        password: 'Password@123',
        role: 'user',
        status: 'inactive',
      },
      {
        name: 'Jim Halpert',
        email: 'jim.halpert@athlead.com',
        password: 'Password@123',
        role: 'user',
        status: 'active',
      },
      {
        name: 'Tony Stark',
        email: 'tony.stark@starkindustries.com',
        password: 'Password@123',
        role: 'admin',
        status: 'active',
      },
    ];

    for (const sample of sampleUsers) {
      const exists = await User.findOne({ email: sample.email });
      if (!exists) {
        await User.create(sample);
        console.log(`[Seed] Sample user created: ${sample.name} (${sample.email})`);
      }
    }

    const total = await User.countDocuments();
    console.log(`[Seed] Database seeding completed successfully. Total users: ${total}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
};

seedDatabase();
