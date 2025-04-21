const express = require('express');
const router = express.Router();
const { fetchTwitterMetrics } = require('../services/twitterService');
const TwitterStat = require('../models/TwitterStat');

// GET current metrics (live from Twitter API)
router.get('/', async (req, res) => {
  try {
    const data = await fetchTwitterMetrics();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Twitter metrics' });
  }
});

// POST and save to DB
router.post('/save', async (req, res) => {
  try {
    const metrics = await fetchTwitterMetrics();
    const record = new TwitterStat(metrics);
    await record.save();
    res.json({ success: true, record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save metrics' });
  }
});

module.exports = router;
