import dotenv from 'dotenv';
import app from './app.js';
import razorpayRoutes from './routes/razorpay.js';

dotenv.config();

app.use('/api/razorpay', razorpayRoutes);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;