import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './models/db.js';
import cors from 'cors';
import userRoutes from './routes/user.routs.js';
import productRoutes from './routes/product.routes.js';
import sellerRoutes from './routes/Seller.routes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from "./routes/Cart.routes.js";
import orderRoutes from './routes/order.routes.js';
import razorpayRoutes from './routes/razorpay.js';  // ← ADD THIS

dotenv.config();
const app = express();

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/razorpay', razorpayRoutes);  // ← ADD THIS

// Health check
app.get('/', (req, res) => {
    res.send('Welcome to the PulseCart API');
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app;