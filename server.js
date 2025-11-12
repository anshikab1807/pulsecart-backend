import dotenv from 'dotenv';
import app from './app.js';
import razorpayRoutes from './routes/razorpay.js';
import productRoutes from './routes/product.routes.js'; // ← ADD THIS

dotenv.config();

app.use('/api/razorpay', razorpayRoutes);
app.use('/api/products', productRoutes); // ← ADD THIS LINE

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;