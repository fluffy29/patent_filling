# Patent Filing Platform

> **Democratizing Innovation. Your Idea, Protected.**

A full-stack web application that makes patent filing accessible and affordable for aspiring innovators, students, and first-time creators.

---

## 🚀 Features

### Current (MVP)
- ✅ **User Authentication** - Secure signup/login with JWT and bcrypt
- ✅ **Multi-Step Filing Wizard** - Guided patent application process
- ✅ **Patent Templates** - Pre-built templates for common inventions
- ✅ **Error Checking** - Real-time validation to prevent mistakes
- ✅ **Dashboard** - Track your filings and progress
- ✅ **AI Claims Generator** - Mock claim generation (ready for AI integration)
- ✅ **Responsive Design** - Beautiful slide-style presentation

### Coming Soon
- 🤖 Real AI claims generator (GPT-4 integration)
- 💳 Payment integration (Stripe)
- 📄 PDF generation for USPTO submission
- 📱 Mobile app
- 👥 Community forum

---

## 📁 Project Structure

```
patent-platform/
│
├── server.js              # Express backend server
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .env.example           # Example environment config
│
├── models/
│   ├── User.js            # User schema (MongoDB)
│   └── Filing.js          # Patent filing schema
│
└── public/
    ├── index.html         # Landing page (slide-style)
    ├── signup.html        # User registration
    ├── login.html         # User login
    ├── dashboard.html     # User dashboard
    ├── wizard.html        # Multi-step filing wizard
    ├── roadmap.html       # Product roadmap
    ├── styles.css         # Complete styling
    ├── app.js             # Client-side JavaScript
    └── assets/            # Images, logos, etc.
```

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose ODM)
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Frontend
- **HTML5** - Structure
- **CSS3** - Modern slide-style design with animations
- **Vanilla JavaScript** - No frameworks needed
- **Responsive Design** - Mobile-first approach

---

## 📦 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)

### Step 1: Clone the Repository
```bash
cd /home/hassan/Documents/front_end/patent-platform
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/patent-platform
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Important:** Change `JWT_SECRET` to a strong random string in production!

### Step 4: Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas** (cloud):
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env`

---

## 🚀 Running the Application

### Development Mode
```bash
npm start
```

Or with auto-restart (if you have nodemon):
```bash
npm run dev
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📚 Usage Guide

### 1. **Landing Page** (`/index.html`)
- Slide-style presentation of the platform
- Covers: Problem, Target, UVP, Roadmap, Pricing, Metrics
- Call-to-action buttons to sign up

### 2. **Sign Up** (`/signup.html`)
- Create a new account
- Fields: Name, Email, Password (min 6 characters)
- Automatic login after signup

### 3. **Login** (`/login.html`)
- Sign in with email and password
- JWT token stored in `localStorage`
- Redirects to dashboard

### 4. **Dashboard** (`/dashboard.html`)
- View filing statistics
- Start new filing
- See recent filings
- Navigate to wizard or roadmap

### 5. **Filing Wizard** (`/wizard.html`)
- **Step 1:** Title & Abstract
- **Step 2:** Problem Statement
- **Step 3:** Target Audience
- **Step 4:** Technical Description
- **Step 5:** Claims (with AI generator button)
- **Step 6:** Upload Sketches (coming soon)
- **Step 7:** Review & Submit

### 6. **Roadmap** (`/roadmap.html`)
- View product development timeline
- NOW, NEXT, LATER phases
- Suggest features (coming soon)

---

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Protected Routes** - Client and server-side protection
- **Input Validation** - Prevent malicious data
- **CORS Configuration** - Secure cross-origin requests
- **Environment Variables** - Sensitive data not in code

---

## 🧪 Testing

### Test User Registration
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Test User Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Test Get Current User
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Filings
- `POST /api/filing/create` - Create new filing (protected)
- `GET /api/filing/list` - Get user's filings (protected)
- `GET /api/filing/:id` - Get single filing (protected)

---

## 🌐 Deployment

### Deploy to Heroku

1. **Install Heroku CLI**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create patent-filing-platform
```

4. **Add MongoDB Atlas**
```bash
heroku addons:create mongolab:sandbox
```

5. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your_production_secret
```

6. **Deploy**
```bash
git add .
git commit -m "Initial deployment"
git push heroku main
```

7. **Open App**
```bash
heroku open
```

### Deploy to Vercel/Netlify

See platform-specific guides for Node.js apps with MongoDB.

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Future Enhancements

- [ ] Integrate OpenAI GPT-4 for real AI claim generation
- [ ] Add Stripe payment processing
- [ ] Generate USPTO-compliant PDF documents
- [ ] Prior art search using patent databases
- [ ] Email notifications for filing status updates
- [ ] Mobile app (React Native)
- [ ] Admin panel for managing users and filings
- [ ] Multi-language support
- [ ] International filing (PCT, EPO)
- [ ] IP licensing marketplace

---

## 📞 Support

For questions or issues:
- Email: support@patentfilingplatform.com (example)
- GitHub Issues: [Create an issue](https://github.com/yourrepo/issues)

---

## 🎉 Acknowledgments

Built with ❤️ to democratize innovation and make patent filing accessible to everyone.

**Cost Reduction:** Traditional filing costs $10,000–$20,000. We make it $500–$800.

**Innovation shouldn't be a luxury.**

---

Made with ☕ and 🚀 by the Patent Filing Platform Team
# patent_filling
