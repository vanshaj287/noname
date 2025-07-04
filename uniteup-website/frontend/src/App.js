import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled, { createGlobalStyle } from 'styled-components';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Donate from './pages/Donate';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import EventTicketing from './pages/EventTicketing';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import OrderConfirmation from './pages/OrderConfirmation';
import DonationSuccess from './pages/DonationSuccess';
import TicketSuccess from './pages/TicketSuccess';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
  }

  h3 {
    font-size: 2rem;
    font-weight: 600;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  h5 {
    font-size: 1.25rem;
    font-weight: 500;
  }

  h6 {
    font-size: 1rem;
    font-weight: 500;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.7;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #e74c3c;
      box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section-padding {
    padding: 80px 0;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    gap: 8px;
    
    &.btn-primary {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
      
      &:hover {
        background: linear-gradient(135deg, #c0392b, #a93226);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
      }
    }
    
    &.btn-secondary {
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
      
      &:hover {
        background: linear-gradient(135deg, #2980b9, #21618c);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
      }
    }
    
    &.btn-outline {
      background: transparent;
      border: 2px solid #e74c3c;
      color: #e74c3c;
      
      &:hover {
        background: #e74c3c;
        color: white;
      }
    }
    
    &.btn-large {
      padding: 16px 32px;
      font-size: 1.1rem;
    }
  }

  .text-center {
    text-align: center;
  }

  .text-gradient {
    background: linear-gradient(135deg, #e74c3c, #9b59b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeIn 0.8s ease forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .grid {
    display: grid;
    gap: 2rem;
  }

  .grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .grid-4 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    
    h2 {
      font-size: 2rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
    
    .container {
      padding: 0 16px;
    }
    
    .section-padding {
      padding: 60px 0;
    }
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContainer>
            <GlobalStyle />
            <ScrollToTop />
            
            <Header />
            
            <MainContent>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/events" element={<Events />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/event/:id/book" element={<EventTicketing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                <Route path="/donation-success/:id" element={<DonationSuccess />} />
                <Route path="/ticket-success/:id" element={<TicketSuccess />} />
              </Routes>
            </MainContent>
            
            <Footer />
            
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: '#27ae60',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  theme: {
                    primary: '#e74c3c',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </AppContainer>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;