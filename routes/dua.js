import express from 'express';
import Dua from '../models/Dua.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const duas = await Dua.find();
    res.json(duas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/category/:category', async (req, res) => {
  try {
    const duas = await Dua.find({ category: req.params.category });
    res.json(duas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
