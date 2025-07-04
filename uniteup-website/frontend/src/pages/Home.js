import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiHeart, 
  FiUsers, 
  FiTarget, 
  FiAward,
  FiShoppingBag,
  FiCalendar,
  FiGift
} from 'react-icons/fi';
import axios from 'axios';

// Styled Components
const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(231, 76, 60, 0.8), rgba(155, 89, 182, 0.8)),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ff6b6b"/><stop offset="100%" stop-color="%23ee5a24"/></radialGradient></defs><circle cx="50%" cy="50%" r="500" fill="url(%23a)" opacity="0.1"/></svg>');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  margin-top: 80px;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 3rem;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const StatsSection = styled.section`
  background: white;
  padding: 80px 0;
  transform: translateY(-50px);
  z-index: 3;
  position: relative;
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #e74c3c;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
`;

const Section = styled.section`
  padding: 80px 0;
  
  &.bg-light {
    background: #f8f9fa;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const DonationBox = styled(motion.div)`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(231, 76, 60, 0.3);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const DonationOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const DonationOption = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover, &.active {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
  }
`;

const CustomDonationInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.1rem;
  margin: 1rem 0;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #e74c3c, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const ProductDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #e74c3c;
  margin-bottom: 1rem;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const EventCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 5px solid #e74c3c;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const EventDate = styled.div`
  color: #e74c3c;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const EventDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const Home = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    donations: { count: 0, total: 0 },
    orders: { count: 0, total: 0 },
    events: { count: 0 },
    tickets: { count: 0, total: 0 }
  });

  useEffect(() => {
    // Fetch featured products
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.slice(0, 3)); // Show first 3 products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Fetch upcoming events
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data.slice(0, 3)); // Show first 3 events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchProducts();
    fetchEvents();
  }, []);

  const donationOptions = [
    { label: 'Gift a Happy Meal', amount: 350 },
    { label: 'Sponsor a Blanket', amount: 200 },
    { label: 'Help Job Seeker', amount: 1000 },
    { label: 'Monthly Support', amount: 1100 }
  ];

  const handleDonationSelect = (option) => {
    setSelectedDonation(option);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedDonation(null);
  };

  const handleDonate = () => {
    const amount = selectedDonation?.amount || parseFloat(customAmount);
    if (amount && amount > 0) {
      // Navigate to donation page with pre-filled amount
      window.location.href = `/donate?amount=${amount}`;
    }
  };

  const statsData = [
    { 
      icon: <FiHeart />, 
      number: '₹7,00,000', 
      label: 'Donations Collected' 
    },
    { 
      icon: <FiUsers />, 
      number: '1,600', 
      label: 'Lives Impacted' 
    },
    { 
      icon: <FiTarget />, 
      number: '300', 
      label: 'Active Volunteers' 
    },
    { 
      icon: <FiAward />, 
      number: '25', 
      label: 'Projects Completed' 
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to UniteUp
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Uniting hearts, spreading smiles, and turning kindness into action—because 
            at UniteUp, changing the world starts with us!
          </HeroSubtitle>
          <HeroButtons
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/donate" className="btn btn-primary btn-large">
              <FiHeart />
              Donate Now
            </Link>
            <Link to="/shop" className="btn btn-outline btn-large">
              <FiShoppingBag />
              Shop for Good
            </Link>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection>
        <StatsContainer>
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div style={{ fontSize: '2rem', color: '#e74c3c', marginBottom: '1rem' }}>
                {stat.icon}
              </div>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </StatsSection>

      {/* Quick Donation Section */}
      <Section>
        <div className="container">
          <SectionHeader>
            <SectionTitle>Make a Quick Donation</SectionTitle>
            <SectionSubtitle>
              Choose an amount or enter your own to make an immediate impact
            </SectionSubtitle>
          </SectionHeader>
          
          <DonationBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>
              <FiGift style={{ marginRight: '0.5rem' }} />
              Choose Your Impact
            </h3>
            
            <DonationOptions>
              {donationOptions.map((option, index) => (
                <DonationOption
                  key={index}
                  className={selectedDonation === option ? 'active' : ''}
                  onClick={() => handleDonationSelect(option)}
                >
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    {option.label}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                    ₹{option.amount}
                  </div>
                </DonationOption>
              ))}
            </DonationOptions>
            
            <CustomDonationInput
              type="number"
              placeholder="Enter custom amount (₹)"
              value={customAmount}
              onChange={handleCustomAmountChange}
            />
            
            <button 
              className="btn btn-secondary btn-large"
              onClick={handleDonate}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Contribute to a Brighter Future
              <FiArrowRight />
            </button>
          </DonationBox>
        </div>
      </Section>

      {/* Featured Products Section */}
      <Section className="bg-light">
        <div className="container">
          <SectionHeader>
            <SectionTitle>Shop for a Cause</SectionTitle>
            <SectionSubtitle>
              Purchase handcrafted items made by local artisans and support our mission
            </SectionSubtitle>
          </SectionHeader>
          
          <ProductGrid>
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductImage>
                  {product.name}
                </ProductImage>
                <ProductContent>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductDescription>
                    {product.description?.substring(0, 100)}...
                  </ProductDescription>
                  <ProductPrice>₹{product.price}</ProductPrice>
                  <Link 
                    to={`/product/${product.id}`} 
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    View Details
                  </Link>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductGrid>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/shop" className="btn btn-outline btn-large">
              View All Products
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </Section>

      {/* Upcoming Events Section */}
      <Section>
        <div className="container">
          <SectionHeader>
            <SectionTitle>Upcoming Events</SectionTitle>
            <SectionSubtitle>
              Join us at our upcoming events and be part of the change
            </SectionSubtitle>
          </SectionHeader>
          
          <EventGrid>
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <EventDate>
                  <FiCalendar style={{ marginRight: '0.5rem' }} />
                  {new Date(event.event_date).toLocaleDateString()}
                </EventDate>
                <EventTitle>{event.title}</EventTitle>
                <EventDescription>
                  {event.description?.substring(0, 120)}...
                </EventDescription>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#e74c3c', fontWeight: '600' }}>
                    ₹{event.ticket_price}
                  </span>
                  <Link 
                    to={`/event/${event.id}`} 
                    className="btn btn-primary"
                  >
                    Learn More
                  </Link>
                </div>
              </EventCard>
            ))}
          </EventGrid>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/events" className="btn btn-outline btn-large">
              View All Events
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;