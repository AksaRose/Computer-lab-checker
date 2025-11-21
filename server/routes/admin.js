const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabase');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/logs', requireAuth, requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

module.exports = router;