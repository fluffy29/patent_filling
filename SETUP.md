# 🚀 Quick Setup Guide

## Prerequisites Check

Before running the application, ensure you have:

1. **Node.js** (v16+)
   ```bash
   node --version
   ```

2. **MongoDB** (local or Atlas)
   - **Option A: Local MongoDB**
     ```bash
     # Check if MongoDB is installed
     mongod --version
     
     # Start MongoDB
     # Linux:
     sudo systemctl start mongod
     
     # macOS:
     brew services start mongodb-community
     
     # Windows:
     net start MongoDB
     ```
   
   - **Option B: MongoDB Atlas (Cloud - Recommended)**
     1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
     2. Create free account
     3. Create a cluster
     4. Get connection string
     5. Update `.env` with your connection string

---

## Installation Steps

### 1. Navigate to Project
```bash
cd /home/hassan/Documents/front_end/patent-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
The `.env` file is already created. Update if needed:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/patent-platform
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**⚠️ Important:** Change `JWT_SECRET` in production!

### 4. Start the Server

**Option A: Quick Start Script**
```bash
./start.sh
```

**Option B: Manual Start**
```bash
npm start
```

**Option C: Development Mode (with auto-restart)**
```bash
npm run dev
```

---

## Access the Application

Once the server starts, you'll see:
```
✅ MongoDB connected
🚀 Patent Filing Platform running at http://localhost:3000
```

**Open in browser:**
```
http://localhost:3000
```

---

## First-Time User Flow

### 1. Landing Page
- View the slide-style presentation
- Learn about the platform
- Click "Get Started Free"

### 2. Sign Up
- Create account with name, email, password
- Automatically logged in after signup

### 3. Dashboard
- View your filing statistics
- Click "Start Now" to begin a filing

### 4. Filing Wizard (7 Steps)
- Fill in invention details step by step
- Use "Auto-Generate Claims" button in step 5
- Review and submit

### 5. View Your Filings
- Return to dashboard to see all filings
- Track status (draft, submitted, etc.)

---

## Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB connection error: connect ECONNREFUSED
```

**Solution:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Try MongoDB Atlas instead

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change PORT in .env
PORT=3001
```

### JWT Secret Warning
**Always** change `JWT_SECRET` before deploying to production!

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Testing the API

### Create Test User
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"test123"}'
```

Copy the `token` from response and use it:

### Get Current User
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Development Tips

### View MongoDB Data
```bash
# Connect to MongoDB shell
mongosh

# Switch to database
use patent-platform

# View users
db.users.find().pretty()

# View filings
db.filings.find().pretty()
```

### Auto-Restart on Changes
Install nodemon globally:
```bash
npm install -g nodemon
```

Then use:
```bash
npm run dev
```

### Clear All Data (Reset)
```bash
mongosh
use patent-platform
db.dropDatabase()
```

---

## Next Steps

1. ✅ **Test the application** - Create account, submit filing
2. 🎨 **Customize styling** - Edit `public/styles.css`
3. 🤖 **Add real AI** - Integrate OpenAI API for claims generation
4. 💳 **Add payments** - Integrate Stripe
5. 📄 **PDF generation** - Use libraries like PDFKit
6. 🚀 **Deploy** - Heroku, Vercel, or DigitalOcean

---

## Support

Need help? Check:
- `README.md` - Full documentation
- Server logs in terminal
- Browser console (F12) for frontend errors

---

Happy Innovating! 🚀
