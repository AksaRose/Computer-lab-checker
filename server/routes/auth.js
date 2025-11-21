const express = require('express');
const supabase = require('../utils/supabase');

const router = express.Router();

// Sign-up endpoint
router.post('/signup', async (req, res) => {
  const { email, password, full_name, year } = req.body;

  if (!email || !password || !full_name || !year) {
    return res.status(400).json({ error: 'Email, password, full name, and year are required.' });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        year,
      },
    },
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: 'User created. Please check your email to verify.', user: data.user });
});

// Sign-in endpoint
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  const { user } = data;
  const twoMonths = 2 * 30 * 24 * 60 * 60 * 1000;

  res.cookie('user', JSON.stringify({ name: user.user_metadata.full_name, year: user.user_metadata.year }), {
    maxAge: twoMonths,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({ message: 'Signed in successfully', session: data.session, user: data.user });
});

router.get('/user-from-cookie', (req, res) => {
  const userCookie = req.cookies.user;

  if (userCookie) {
    res.status(200).json(JSON.parse(userCookie));
  } else {
    res.status(404).json({ message: 'No user cookie found' });
  }
});

module.exports = router;