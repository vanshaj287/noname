# 🚀 UniteUp NGO Website - Quick Start Guide

Get your UniteUp NGO website running in minutes!

## 🎯 One-Command Setup

```bash
# Clone and setup everything automatically
git clone <repository-url>
cd uniteup-website
./run-setup.sh
```

The script will:
- ✅ Check prerequisites (Node.js, npm)
- 📦 Install all dependencies
- 📝 Create environment configuration
- 🚀 Optionally start the application

## 🛠 Manual Setup (Alternative)

If you prefer manual setup:

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Start the Application

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### 3. Access the Website

- 🌐 **Frontend**: http://localhost:3000
- 🔌 **Backend API**: http://localhost:5000

## 🎨 What You'll See

### Homepage Features:
- 🎬 **Hero Section** with call-to-action buttons
- 📊 **Impact Statistics** (donations, lives impacted, volunteers)
- 💝 **Quick Donation Box** with preset amounts
- 🛍️ **Featured Products** from local artisans
- 📅 **Upcoming Events** with ticket booking

### Core Functionality:
- 💰 **Donation System** - Secure donation processing
- 🛒 **E-commerce Store** - Shop for handcrafted items
- 🎫 **Event Ticketing** - Book tickets for NGO events
- 📄 **PDF Receipts** - Automatic receipt generation
- 👤 **User Authentication** - Login/register system

## 🗄️ Database & Sample Data

The application automatically creates a SQLite database with sample data:

- **5 Products** - Handcrafted items with descriptions
- **4 Events** - Upcoming NGO events with different ticket prices
- **Sample Statistics** - Donation and impact numbers

## 🔧 Configuration

### Environment Variables (.env)
```env
PORT=5000
JWT_SECRET=uniteup_secret_key_2024
NODE_ENV=development
```

All other settings use sensible defaults for development.

## 🎯 Key Features to Test

### 1. Make a Donation
1. Click "Donate Now" on homepage
2. Select amount or enter custom amount
3. Fill in donor information
4. Submit donation
5. Download PDF receipt

### 2. Shop for Products
1. Browse featured products on homepage
2. Click "View All Products" to see full catalog
3. Add items to cart
4. Proceed to checkout

### 3. Book Event Tickets
1. View events on homepage
2. Click "Learn More" on any event
3. Book tickets for events
4. Get PDF tickets with QR codes

### 4. User Authentication
1. Click "Login" in header
2. Register new account or login
3. Access user dashboard

## 📱 Responsive Design

The website is fully responsive and works on:
- 💻 **Desktop** - Full feature experience
- 📱 **Mobile** - Touch-optimized interface
- 📟 **Tablet** - Adaptive layouts

## 🎨 Design System

- **Primary Color**: Red (#e74c3c)
- **Accent Color**: Purple (#9b59b6)
- **Typography**: Inter (body), Poppins (headings)
- **Animations**: Smooth transitions and micro-interactions

## 🔒 Security Features

- 🛡️ **JWT Authentication** - Secure token-based auth
- 🔐 **Password Hashing** - Bcrypt encryption
- ✅ **Input Validation** - Server-side validation
- 🌐 **CORS Protection** - Cross-origin security

## 📊 Admin Features

Access admin dashboard at: `/dashboard` (after login)
- 📈 **Statistics Overview** - Donations, orders, events
- 📋 **Transaction History** - All payments and bookings
- 📄 **Receipt Management** - Download all receipts

## 🛠 Development

### File Structure
```
uniteup-website/
├── backend/          # Express.js API
├── frontend/         # React application
├── database/         # SQLite database
└── README.md         # Full documentation
```

### API Endpoints
- `POST /api/donations` - Process donations
- `GET /api/products` - List products
- `POST /api/orders` - Create orders
- `GET /api/events` - List events
- `POST /api/events/:id/book` - Book tickets

## 🐛 Troubleshooting

### Common Issues:

**Port already in use:**
```bash
# Kill processes on ports 3000 and 5000
sudo kill -9 $(lsof -ti:3000)
sudo kill -9 $(lsof -ti:5000)
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Database issues:**
```bash
# Delete and recreate database
rm database/uniteup.db
# Restart backend server
```

## 📞 Support

Need help? 
- 📧 **Email**: info@uniteup.org
- 📞 **Phone**: +91 9711883411
- 📚 **Docs**: See README.md for detailed documentation

## 🎉 Next Steps

1. **Customize Content** - Update NGO information and images
2. **Payment Integration** - Add real payment gateways
3. **Email Setup** - Configure SMTP for notifications
4. **Deploy** - Host on your preferred platform

---

**Happy Coding! 🚀**

*Made with ❤️ by UniteUp Team*