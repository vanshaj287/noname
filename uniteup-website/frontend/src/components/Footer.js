import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin,
  FiYoutube,
  FiHeart
} from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  padding: 60px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div`
  h3 {
    color: #e74c3c;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 15px;
    color: #bdc3c7;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled(Link)`
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #e74c3c;
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #bdc3c7;
  
  svg {
    color: #e74c3c;
    flex-shrink: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(231, 76, 60, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e74c3c;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e74c3c;
    color: white;
    transform: translateY(-3px);
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  
  input {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    
    &::placeholder {
      color: #bdc3c7;
    }
    
    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.2);
    }
  }
  
  button {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #c0392b, #a93226);
    }
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
`;

const FooterBottomContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #bdc3c7;
  font-size: 0.9rem;
  margin: 0;
  
  .heart {
    color: #e74c3c;
    margin: 0 5px;
  }
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    const email = e.target.email.value;
    console.log('Newsletter subscription:', email);
    // You can implement actual newsletter subscription here
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About UniteUp</h3>
          <p>
            Uniting hearts, spreading smiles, and turning kindness into action. 
            We're dedicated to creating positive change in communities through 
            sustainable initiatives and collaborative efforts.
          </p>
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FiFacebook size={20} />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter size={20} />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FiInstagram size={20} />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FiLinkedin size={20} />
            </SocialLink>
            <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FiYoutube size={20} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLinks>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/donate">Make a Donation</FooterLink>
            <FooterLink to="/shop">Shop for Good</FooterLink>
            <FooterLink to="/events">Upcoming Events</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/volunteer">Volunteer</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Get Involved</h3>
          <FooterLinks>
            <FooterLink to="/donate">One-time Donation</FooterLink>
            <FooterLink to="/donate">Monthly Giving</FooterLink>
            <FooterLink to="/events">Attend Events</FooterLink>
            <FooterLink to="/volunteer">Become a Volunteer</FooterLink>
            <FooterLink to="/partner">Corporate Partnership</FooterLink>
            <FooterLink to="/fundraise">Start Fundraising</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            <ContactItem>
              <FiPhone size={18} />
              <span>+91 9711883411</span>
            </ContactItem>
            <ContactItem>
              <FiMail size={18} />
              <span>info@uniteup.org</span>
            </ContactItem>
            <ContactItem>
              <FiMapPin size={18} />
              <span>New Delhi, India</span>
            </ContactItem>
          </ContactInfo>
          
          <h3 style={{ marginTop: '30px' }}>Newsletter</h3>
          <p style={{ fontSize: '0.9rem' }}>
            Stay updated with our latest news and events
          </p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              required 
            />
            <button type="submit">Subscribe</button>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <FooterBottomContent>
          <Copyright>
            © 2024 UniteUp NGO. Made with <FiHeart className="heart" /> for a better world.
          </Copyright>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
            <Link to="/privacy" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link to="/terms" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
              Terms of Service
            </Link>
          </div>
        </FooterBottomContent>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;