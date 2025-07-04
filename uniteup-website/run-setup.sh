#!/bin/bash

# UniteUp NGO Website Setup Script
echo "🚀 Setting up UniteUp NGO Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env 2>/dev/null || cat > .env << EOL
PORT=5000
JWT_SECRET=uniteup_secret_key_2024
NODE_ENV=development
DB_PATH=./database/uniteup.db
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
EOL
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "✅ All dependencies installed successfully!"

# Ask if user wants to start the application
read -p "🚀 Do you want to start the application now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🎯 Starting UniteUp NGO Website..."
    echo "📍 Backend will run on: http://localhost:5000"
    echo "📍 Frontend will run on: http://localhost:3000"
    echo ""
    echo "💡 Note: Keep this terminal open and open a new terminal to use both frontend and backend"
    echo ""
    
    # Start backend in background
    cd ../backend
    npm run dev &
    BACKEND_PID=$!
    
    # Wait a moment for backend to start
    sleep 3
    
    # Start frontend
    cd ../frontend
    npm start
    
    # Kill backend when frontend stops
    kill $BACKEND_PID 2>/dev/null
else
    echo "👍 Setup complete! To start the application later:"
    echo ""
    echo "🔹 Backend: cd backend && npm run dev"
    echo "🔹 Frontend: cd frontend && npm start"
    echo ""
    echo "📖 See README.md for detailed instructions"
fi