import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/noorlislam')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Import Routes
import authRoutes from './routes/auth.js';
import quranRoutes from './routes/quran.js';
import namazRoutes from './routes/namaz.js';
import duaRoutes from './routes/dua.js';
import hadithRoutes from './routes/hadith.js';
import userRoutes from './routes/user.js';
import prayerTimesRoutes from './routes/prayerTimes.js';
import islamicCalendarRoutes from './routes/islamicCalendar.js';
import zakatRoutes from './routes/zakat.js';
import prophetRoutes from './routes/prophet.js';
import quizRoutes from './routes/quiz.js';

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quran', quranRoutes);
app.use('/api/namaz', namazRoutes);
app.use('/api/dua', duaRoutes);
app.use('/api/hadith', hadithRoutes);
app.use('/api/user', userRoutes);
app.use('/api/prayer-times', prayerTimesRoutes);
app.use('/api/islamic-calendar', islamicCalendarRoutes);
app.use('/api/zakat', zakatRoutes);
app.use('/api/prophets', prophetRoutes);
app.use('/api/quiz', quizRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running ✅' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🕋 NoorIslam Server running on port ${PORT}`);
});
