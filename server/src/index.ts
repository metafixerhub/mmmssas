import express from 'react'; // Wait, need to use proper imports for server. Let's fix that.
import expressApp from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

dotenv.config();

const app = expressApp();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware
app.use(helmet());
app.use(cors());
app.use(expressApp.json());

// Init Admin User
const initAdmin = async () => {
  const username = process.env.ADMIN_USERNAME;
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (username && initialPassword) {
    const existingAdmin = await prisma.adminUser.findUnique({ where: { username } });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(initialPassword, 10);
      await prisma.adminUser.create({
        data: {
          username,
          passwordHash,
        },
      });
      console.log(`Admin user '${username}' created from environment variables.`);
    }
  }
};

// Start Server
const startServer = async () => {
  try {
    // Only init if DB is ready (requires prisma migrate dev to have been run)
    try {
      await initAdmin();
    } catch (e) {
      console.log('Database not initialized yet, skipping admin init.');
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// --- Auth Routes ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.adminUser.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Middleware for JWT verification
const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// --- Enquiry Routes ---
const enquirySchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().optional().nullable(),
  goal: z.string().min(1),
  message: z.string().optional().nullable(),
});

// Public: Submit enquiry
app.post('/api/enquiries', async (req, res) => {
  try {
    const data = enquirySchema.parse(req.body);
    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        fitnessGoal: data.goal,
        message: data.message || null,
        status: 'NEW'
      }
    });
    res.status(201).json({ success: true, id: enquiry.id });
  } catch (err) {
    res.status(400).json({ error: 'Validation failed or bad request' });
  }
});

// Protected: Get all enquiries
app.get('/api/enquiries', authenticate, async (req, res) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected: Update enquiry status
app.patch('/api/enquiries/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // NEW, CONTACTED, CLOSED
    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: { status }
    });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Protected: Delete enquiry
app.delete('/api/enquiries/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.enquiry.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

