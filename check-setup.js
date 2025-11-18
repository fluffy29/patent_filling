const fs = require('fs');
const path = require('path');

console.log('🔍 Patent Filing Platform - Environment Check\n');
console.log('='.repeat(50));

// Check Node.js version
console.log('\n✓ Node.js Version:', process.version);
const nodeVersion = parseInt(process.version.slice(1).split('.')[0]);
if (nodeVersion < 16) {
    console.log('⚠️  Warning: Node.js 16+ recommended');
} else {
    console.log('✅ Node.js version is compatible');
}

// Check if .env exists
console.log('\n📁 Checking .env file...');
if (fs.existsSync('.env')) {
    console.log('✅ .env file exists');
    
    require('dotenv').config();
    
    // Check required variables
    const requiredVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET'];
    let allPresent = true;
    
    requiredVars.forEach(varName => {
        if (process.env[varName]) {
            console.log(`   ✓ ${varName} is set`);
        } else {
            console.log(`   ✗ ${varName} is MISSING`);
            allPresent = false;
        }
    });
    
    if (!allPresent) {
        console.log('\n⚠️  Some environment variables are missing!');
        console.log('   Please check your .env file');
    }
    
    // Check JWT secret strength
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
        console.log('\n⚠️  JWT_SECRET is too short! Use at least 32 characters');
    }
    
} else {
    console.log('❌ .env file not found!');
    console.log('   Copy .env.example to .env and configure it');
}

// Check MongoDB connection
console.log('\n🗄️  Testing MongoDB connection...');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patent-platform', {
    serverSelectionTimeoutMS: 3000
})
    .then(() => {
        console.log('✅ MongoDB connection successful');
        console.log(`   Connected to: ${mongoose.connection.name}`);
        mongoose.connection.close();
        
        console.log('\n' + '='.repeat(50));
        console.log('✅ All checks passed! Ready to run the server.');
        console.log('\nStart the server with:');
        console.log('  npm start');
        console.log('\nor use the quick start script:');
        console.log('  ./start.sh');
        console.log('='.repeat(50) + '\n');
        process.exit(0);
    })
    .catch(err => {
        console.log('❌ MongoDB connection failed');
        console.log('   Error:', err.message);
        console.log('\n📝 Possible solutions:');
        console.log('   1. Start MongoDB: sudo systemctl start mongod');
        console.log('   2. Use MongoDB Atlas (cloud) and update MONGODB_URI');
        console.log('   3. Check if MongoDB is installed: mongod --version');
        console.log('\n' + '='.repeat(50) + '\n');
        process.exit(1);
    });
