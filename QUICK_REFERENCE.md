# 🎯 QUICK REFERENCE CARD

## Essential Commands

```bash
# Check if everything is set up correctly
npm run check

# Start the server (production)
npm start

# Start with auto-restart (development)
npm run dev

# Quick start script
./start.sh
```

---

## MongoDB Commands

```bash
# Start MongoDB (Linux)
sudo systemctl start mongod

# Start MongoDB (macOS)
brew services start mongodb-community

# Check MongoDB status
sudo systemctl status mongod

# Connect to MongoDB shell
mongosh

# Use patent database
use patent-platform

# View all users
db.users.find().pretty()

# View all filings
db.filings.find().pretty()

# Count documents
db.users.countDocuments()
db.filings.countDocuments()

# Delete all data (careful!)
db.users.deleteMany({})
db.filings.deleteMany({})
```

---

## Test API Endpoints

```bash
# Sign Up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get current user (replace TOKEN)
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Create filing (replace TOKEN)
curl -X POST http://localhost:3000/api/filing/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title":"Smart Water Bottle",
    "abstract":"A bottle that tracks hydration",
    "problem":"People forget to drink water",
    "audience":"Health-conscious individuals",
    "description":"Uses sensors to track water intake",
    "claims":"1. A smart water bottle..."
  }'

# List filings (replace TOKEN)
curl http://localhost:3000/api/filing/list \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## URLs to Access

```
Landing Page:   http://localhost:3000/
Sign Up:        http://localhost:3000/signup.html
Login:          http://localhost:3000/login.html
Dashboard:      http://localhost:3000/dashboard.html
Wizard:         http://localhost:3000/wizard.html
Roadmap:        http://localhost:3000/roadmap.html
```

---

## Environment Variables (.env)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/patent-platform
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

---

## Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Port Troubleshooting

```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port in .env
PORT=3001
```

---

## Git Commands

```bash
# Initialize repo
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete Patent Filing Platform"

# Add remote
git remote add origin https://github.com/yourusername/patent-platform.git

# Push
git push -u origin main
```

---

## Deploy to Heroku

```bash
# Login
heroku login

# Create app
heroku create patent-filing-platform

# Add MongoDB
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_production_secret

# Deploy
git push heroku main

# Open app
heroku open
```

---

## File Locations

```
Backend:
- server.js
- models/User.js
- models/Filing.js

Frontend:
- public/index.html (landing page)
- public/signup.html
- public/login.html
- public/dashboard.html
- public/wizard.html
- public/roadmap.html
- public/styles.css (all styles)
- public/app.js (client-side logic)

Config:
- package.json
- .env
- .gitignore

Docs:
- README.md
- SETUP.md
- PROJECT_COMPLETE.md
- QUICK_REFERENCE.md (this file)
```

---

## Package Scripts

```bash
npm start        # Start production server
npm run dev      # Start with nodemon (auto-restart)
npm run check    # Verify environment setup
npm install      # Install dependencies
npm fund         # Show funding info
```

---

## Browser DevTools

```
F12              Open DevTools
Console tab      View JavaScript errors
Network tab      View API requests
Application tab  View localStorage (JWT token)
```

---

## Common Issues & Solutions

**MongoDB connection error:**
- Start MongoDB: `sudo systemctl start mongod`
- Use MongoDB Atlas instead

**Port already in use:**
- Kill process: `lsof -i :3000` then `kill -9 <PID>`
- Change port in .env

**JWT errors:**
- Check JWT_SECRET is set in .env
- Clear localStorage and login again

**CORS errors:**
- Server already has CORS enabled
- Check if backend is running

---

## Database Schema

**User:**
- name: String
- email: String (unique)
- password: String (hashed)
- createdAt: Date

**Filing:**
- userId: ObjectId (ref: User)
- title: String
- abstract: String
- problem: String
- audience: String
- description: String
- claims: String
- status: String (draft/submitted/reviewing/approved)
- createdAt: Date
- updatedAt: Date

---

## Support Files

- `check-setup.js` - Verify environment
- `start.sh` - Quick start script
- `.env.example` - Template for environment variables

---

**Quick Help:**
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB version
mongod --version

# View this file
cat QUICK_REFERENCE.md
```

---

**Documentation:**
- Full docs: `README.md`
- Setup guide: `SETUP.md`
- Completion summary: `PROJECT_COMPLETE.md`

---

💡 **Tip:** Keep this file open in a second terminal for quick reference!
