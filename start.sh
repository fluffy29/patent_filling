#!/bin/bash

echo "🚀 Patent Filing Platform - Quick Start"
echo "======================================="
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running!"
    echo ""
    echo "Please start MongoDB first:"
    echo "  • Linux: sudo systemctl start mongod"
    echo "  • macOS: brew services start mongodb-community"
    echo "  • Or use MongoDB Atlas (cloud) and update .env"
    echo ""
    read -p "Press Enter once MongoDB is running..."
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found! Creating from template..."
    cp .env.example .env
    echo "✅ Created .env file. Please update with your settings."
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "✅ Starting server..."
echo ""
npm start
