const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

router.post('/generate', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(userId);
    res.status(200).json({ qrCodeDataUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

module.exports = router;