import express from 'express';
import Prophet from '../models/Prophet.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const prophets = await Prophet.find().sort('order');
    res.json(prophets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const prophet = await Prophet.findOne({ name: req.params.name });
    if (!prophet) return res.status(404).json({ error: 'Prophet not found' });
    res.json(prophet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
