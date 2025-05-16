import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import loginRegisterRoute from './routes/loginRegisterRoute.js';
import newsRoute from './routes/newsRoute.js';

dotenv.config();

const app = express();

// CORS setup with more permissive configuration for development
app.use(cors({
  origin: true, // Allow all origins temporarily
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;

app.use('/register-login', loginRegisterRoute);
app.use('/news',newsRoute);
app.use('/preferences/:email',(req, res) => {
  res.send(`welcome to this page and your email is ${req.params.email}`);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});