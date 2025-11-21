const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const supabase = require('./utils/supabase');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const qrRoutes = require('./routes/qr');
const checkinRoutes = require('./routes/checkin');
const adminRoutes = require('./routes/admin');
const logger = require('./middleware/logging');
const errorHandler = require('./middleware/error');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(express.static('server/public')); // Serve static files from the 'public' directory

app.use('/auth', authRoutes);
app.use('/qr', qrRoutes);
app.use('/checkin', checkinRoutes);
app.use('/admin', adminRoutes);

app.post('/api/scan', (req, res) => {
  const { qrData } = req.body;
  console.log('QR Code Scanned:', qrData);
  // Here you would typically process the QR data,
  // e.g., check against a database, log check-in/out.
  res.json({ message: 'QR Code received', data: qrData });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});