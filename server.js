require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const User = require('./models/User');
const Filing = require('./models/Filing');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patent-platform')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// JWT Middleware - Protect Routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

// ============================================
// AUTH ROUTES
// ============================================

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// GET /api/auth/me - Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ============================================
// FILING ROUTES
// ============================================

// POST /api/filing/create
app.post('/api/filing/create', authenticateToken, async (req, res) => {
  try {
    const { title, abstract, problem, audience, description, claims } = req.body;

    // Validation
    if (!title || !abstract || !problem || !audience || !description || !claims) {
      return res.status(400).json({ error: 'All filing fields are required.' });
    }

    const filing = new Filing({
      userId: req.user.id,
      title,
      abstract,
      problem,
      audience,
      description,
      claims,
      status: 'draft'
    });

    await filing.save();

    res.status(201).json({
      message: 'Filing created successfully',
      filing
    });
  } catch (error) {
    console.error('Create filing error:', error);
    res.status(500).json({ error: 'Server error while creating filing.' });
  }
});

// GET /api/filing/list - Get all filings for current user
app.get('/api/filing/list', authenticateToken, async (req, res) => {
  try {
    const filings = await Filing.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ filings });
  } catch (error) {
    console.error('Get filings error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/filing/:id - Get single filing
app.get('/api/filing/:id', authenticateToken, async (req, res) => {
  try {
    const filing = await Filing.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!filing) {
      return res.status(404).json({ error: 'Filing not found.' });
    }

    res.json({ filing });
  } catch (error) {
    console.error('Get filing error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('                   PATENT FILING PLATFORM                      ');
  console.log('               Democratizing Innovation Since 2025             ');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
  console.log('📊 Database: MongoDB connected');
  console.log('🔐 Authentication: JWT enabled');
  console.log('');
  console.log('📁 Available Routes:');
  console.log('   → Landing Page:  http://localhost:${PORT}/');
  console.log('   → Sign Up:       http://localhost:${PORT}/signup.html');
  console.log('   → Login:         http://localhost:${PORT}/login.html');
  console.log('   → Dashboard:     http://localhost:${PORT}/dashboard.html');
  console.log('   → Wizard:        http://localhost:${PORT}/wizard.html');
  console.log('   → Roadmap:       http://localhost:${PORT}/roadmap.html');
  console.log('');
  console.log('🛠️  Press Ctrl+C to stop the server');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('\n');
});
