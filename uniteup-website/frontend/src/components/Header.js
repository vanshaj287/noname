import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiHeart } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(231, 76, 60, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
`;

const Logo = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #e74c3c, #9b59b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  color: #333;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    color: #e74c3c;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #e74c3c, #9b59b6);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CartButton = styled(Link)`
  position: relative;
  padding: 8px;
  border-radius: 50%;
  background: transparent;
  color: #333;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

const UserButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #c0392b, #a93226);
    transform: translateY(-2px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  padding: 8px;
  border-radius: 8px;
  background: transparent;
  color: #333;
  border: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  z-index: 1001;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
`;

const MobileNavLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #e74c3c;
    transform: scale(1.1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  padding: 8px;
  border-radius: 50%;
  background: transparent;
  color: #333;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <>
      <HeaderContainer>
        <NavContainer>
          <Logo to="/">UNITEUP</Logo>
          
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/donate">Donate</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </NavLinks>
          
          <UserActions>
            <CartButton to="/cart">
              <FiShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <CartBadge>{cartItemsCount}</CartBadge>
              )}
            </CartButton>
            
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  Hello, {user?.name}
                </span>
                <UserButton onClick={handleLogout}>
                  <FiLogOut size={16} />
                </UserButton>
              </div>
            ) : (
              <UserButton onClick={() => navigate('/login')}>
                <FiUser size={16} />
                Login
              </UserButton>
            )}
            
            <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
              <FiMenu size={24} />
            </MobileMenuButton>
          </UserActions>
        </NavContainer>
      </HeaderContainer>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={closeMobileMenu}>
              <FiX />
            </CloseButton>
            
            <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
            <MobileNavLink to="/donate" onClick={closeMobileMenu}>Donate</MobileNavLink>
            <MobileNavLink to="/shop" onClick={closeMobileMenu}>Shop</MobileNavLink>
            <MobileNavLink to="/events" onClick={closeMobileMenu}>Events</MobileNavLink>
            <MobileNavLink to="/about" onClick={closeMobileMenu}>About</MobileNavLink>
            <MobileNavLink to="/contact" onClick={closeMobileMenu}>Contact</MobileNavLink>
            
            {isAuthenticated ? (
              <UserButton onClick={handleLogout}>
                Logout
              </UserButton>
            ) : (
              <UserButton onClick={() => { navigate('/login'); closeMobileMenu(); }}>
                Login
              </UserButton>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;