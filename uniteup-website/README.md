# UniteUp NGO Website

A comprehensive full-stack web application for UniteUp NGO featuring donation management, e-commerce functionality, event ticketing, and PDF receipt generation.

![UniteUp Logo](https://via.placeholder.com/200x80/e74c3c/ffffff?text=UNITEUP)

## 🌟 Features

### Core Functionality
- **Donation System**: Secure donation processing with multiple payment options
- **E-commerce Store**: Shop for handcrafted items supporting local artisans
- **Event Management**: Event listings and ticket booking system
- **PDF Generation**: Automatic receipt generation for donations, orders, and tickets
- **User Authentication**: Secure login/registration system
- **Responsive Design**: Mobile-first, modern UI/UX

### Advanced Features
- **Real-time Cart Management**: Persistent shopping cart with local storage
- **Database Integration**: SQLite database with comprehensive schema
- **Email Notifications**: Automated confirmation emails
- **Admin Dashboard**: Statistics and management interface
- **Receipt Downloads**: PDF receipts for all transactions
- **Social Sharing**: Share donations and events on social media

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uniteup-website
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables**
   ```bash
   cd ../backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize Database**
   ```bash
   # Database will be automatically created when you start the server
   # Sample data will be inserted on first run
   ```

6. **Start the Application**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
uniteup-website/
├── backend/                 # Express.js API server
│   ├── server.js           # Main server file
│   ├── utils/              # Utility functions
│   │   └── pdfGenerator.js # PDF generation utilities
│   ├── uploads/            # File uploads directory
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment configuration
├── frontend/               # React frontend application
│   ├── public/            # Static assets
│   ├── src/               # React source code
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── utils/         # Utility functions
│   │   └── App.js         # Main App component
│   └── package.json       # Frontend dependencies
├── database/              # Database files
│   └── uniteup.db        # SQLite database (auto-generated)
└── README.md             # This file
```

## 🛠 Technology Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **PDF Generation** - Receipt creation
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 📊 Database Schema

### Tables
- **users** - User authentication and profiles
- **donations** - Donation records and receipts
- **products** - E-commerce product catalog
- **orders** - Purchase orders and order items
- **events** - Event listings and details
- **event_tickets** - Ticket bookings and QR codes

## 🔧 Configuration

### Environment Variables (.env)
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
DB_PATH=./database/uniteup.db
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Donations
- `POST /api/donations` - Process donation
- `GET /api/donations/:id` - Get donation details
- `GET /api/donations/:id/receipt` - Download receipt PDF

### Products & Orders
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/:id/receipt` - Download order receipt

### Events & Tickets
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get event details
- `POST /api/events/:id/book` - Book event tickets
- `GET /api/tickets/:id` - Get ticket details
- `GET /api/tickets/:id/pdf` - Download ticket PDF

### Admin
- `GET /api/admin/stats` - Dashboard statistics (protected)

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Red primary (#e74c3c), Purple accent (#9b59b6)
- **Typography**: Inter for body text, Poppins for headings
- **Components**: Reusable styled components
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and micro-interactions

### User Experience
- **Intuitive Navigation**: Clear menu structure
- **Quick Donation**: One-click donation options on homepage
- **Shopping Cart**: Persistent cart with quantity management
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Smooth loading indicators
- **Success Pages**: Comprehensive confirmation pages

## 💳 Payment Integration

Currently configured with mock payment processing for demonstration. For production:

1. **Stripe Integration**:
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```

2. **Razorpay Integration** (for Indian market):
   ```bash
   npm install razorpay
   ```

3. **PayPal Integration**:
   ```bash
   npm install @paypal/react-paypal-js
   ```

## 📄 PDF Generation

The application includes comprehensive PDF generation for:
- **Donation Receipts**: Tax-deductible receipt format
- **Order Receipts**: Detailed purchase confirmations
- **Event Tickets**: QR code enabled tickets

### Customization
Edit `backend/utils/pdfGenerator.js` to customize:
- Receipt templates
- Branding elements
- QR code generation
- Layout and styling

## 🚀 Deployment

### Production Build

1. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve Static Files**:
   ```javascript
   // Add to server.js
   app.use(express.static(path.join(__dirname, '../frontend/build')));
   ```

3. **Environment Setup**:
   ```bash
   NODE_ENV=production
   # Update database path for production
   # Configure email credentials
   # Set up domain and SSL
   ```

### Deployment Platforms
- **Heroku**: Easy deployment with PostgreSQL add-on
- **DigitalOcean**: VPS deployment with PM2
- **Vercel**: Frontend deployment (with serverless functions)
- **Railway**: Full-stack deployment

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Server-side validation
- **CORS Configuration**: Controlled cross-origin requests
- **Rate Limiting**: API request throttling
- **Helmet.js**: Security headers

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Test Coverage
- Unit tests for API endpoints
- Component testing for React components
- Integration tests for user flows

## 📈 Performance Optimization

- **Code Splitting**: React lazy loading
- **Image Optimization**: Responsive images
- **Caching**: Browser and server-side caching
- **Bundle Optimization**: Webpack optimizations
- **Database Indexing**: Optimized queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

For support and questions:
- **Email**: info@uniteup.org
- **Phone**: +91 9711883411
- **GitHub Issues**: [Create an issue](https://github.com/uniteup/website/issues)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern NGO websites and Material Design
- **Icons**: Feather Icons (react-icons/fi)
- **Animations**: Framer Motion library
- **Color Palette**: Flat UI Colors

---

**Made with ❤️ by UniteUp Team**

*Uniting hearts, spreading smiles, and turning kindness into action.*