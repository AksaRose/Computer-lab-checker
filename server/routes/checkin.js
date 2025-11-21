const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabase');

// Check-in endpoint
router.post('/in', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const { data, error } = await supabase
    .from('logs')
    .insert([{ user_id: userId, type: 'check-in' }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: 'Checked in successfully', data });
});

// Check-out endpoint
router.post('/out', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const { data, error } = await supabase
    .from('logs')
    .insert([{ user_id: userId, type: 'check-out' }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: 'Checked out successfully', data });
});

module.exports = router;