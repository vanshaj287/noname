import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart, FiUser, FiMail, FiPhone, FiCreditCard, FiDownload } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const DonateContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 120px 0 80px;
`;

const DonateContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 3rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const DonationCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #e74c3c;
  }
`;

const DonationOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DonationOption = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #e74c3c, #c0392b)' : 'rgba(231, 76, 60, 0.1)'};
  color: ${props => props.active ? 'white' : '#e74c3c'};
  border: 2px solid ${props => props.active ? 'transparent' : '#e74c3c'};
  padding: 1.5rem;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #c0392b, #a93226)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(231, 76, 60, 0.3);
  }
`;

const CustomAmountSection = styled.div`
  margin-bottom: 2rem;
`;

const CustomAmountInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr'};
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #e74c3c;
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
  }
`;

const DonationSummary = styled.div`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
`;

const SummaryTitle = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const SummaryAmount = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const SummaryDescription = styled.p`
  opacity: 0.9;
  margin-bottom: 0;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: linear-gradient(135deg, #229954, #1e8449);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(39, 174, 96, 0.3);
  }
  
  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Donate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    donor_phone: '',
    message: '',
    donation_type: ''
  });

  // Pre-fill amount from URL params (from home page quick donation)
  useEffect(() => {
    const amount = searchParams.get('amount');
    if (amount) {
      setCustomAmount(amount);
    }
  }, [searchParams]);

  const donationOptions = [
    {
      amount: 350,
      label: 'Gift a Happy Meal',
      description: 'Provide a nutritious meal to someone in need'
    },
    {
      amount: 200,
      label: 'Sponsor a Blanket',
      description: 'Keep someone warm during cold nights'
    },
    {
      amount: 1000,
      label: 'Help a Job Seeker',
      description: 'Support skills training and job placement'
    },
    {
      amount: 1100,
      label: 'Monthly Support',
      description: 'Become a monthly supporter of our mission'
    },
    {
      amount: 2500,
      label: 'Education Sponsor',
      description: 'Fund educational materials for children'
    },
    {
      amount: 5000,
      label: 'Community Project',
      description: 'Support larger community development initiatives'
    }
  ];

  const handleAmountSelect = (option) => {
    setSelectedAmount(option);
    setCustomAmount(option.amount.toString());
    setFormData(prev => ({
      ...prev,
      donation_type: option.label
    }));
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
    setFormData(prev => ({
      ...prev,
      donation_type: 'Custom Donation'
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customAmount || parseFloat(customAmount) <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    if (!formData.donor_name || !formData.donor_email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const donationData = {
        ...formData,
        amount: parseFloat(customAmount),
        donation_type: formData.donation_type || 'Custom Donation'
      };

      const response = await axios.post('/api/donations', donationData);
      
      if (response.data.success) {
        toast.success('Donation processed successfully!');
        navigate(`/donation-success/${response.data.donation_id}`);
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Donation failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const currentAmount = parseFloat(customAmount) || 0;
  const selectedOption = donationOptions.find(opt => opt.amount === currentAmount);

  return (
    <DonateContainer>
      <DonateContent>
        <Header>
          <Title>Make a Donation</Title>
          <Subtitle>
            Your generosity creates lasting change in our communities. 
            Every donation, no matter the size, makes a meaningful impact.
          </Subtitle>
        </Header>

        <DonationCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>
            <FiHeart />
            Choose Your Impact
          </SectionTitle>
          
          <DonationOptions>
            {donationOptions.map((option, index) => (
              <DonationOption
                key={index}
                active={selectedAmount === option}
                onClick={() => handleAmountSelect(option)}
              >
                <div style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  ₹{option.amount}
                </div>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  {option.label}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                  {option.description}
                </div>
              </DonationOption>
            ))}
          </DonationOptions>

          <CustomAmountSection>
            <Label>Or enter a custom amount:</Label>
            <CustomAmountInput
              type="number"
              placeholder="Enter amount in ₹"
              value={customAmount}
              onChange={handleCustomAmountChange}
              min="1"
            />
          </CustomAmountSection>

          {currentAmount > 0 && (
            <DonationSummary>
              <SummaryTitle>Donation Summary</SummaryTitle>
              <SummaryAmount>₹{currentAmount.toLocaleString()}</SummaryAmount>
              <SummaryDescription>
                {selectedOption ? selectedOption.description : 'Thank you for your generous custom donation!'}
              </SummaryDescription>
            </DonationSummary>
          )}
        </DonationCard>

        <DonationCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionTitle>
            <FiUser />
            Your Information
          </SectionTitle>

          <Form onSubmit={handleSubmit}>
            <FormRow columns="1fr 1fr">
              <FormGroup>
                <Label>
                  <FiUser />
                  Full Name *
                </Label>
                <Input
                  type="text"
                  name="donor_name"
                  value={formData.donor_name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>
                  <FiMail />
                  Email Address *
                </Label>
                <Input
                  type="email"
                  name="donor_email"
                  value={formData.donor_email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>
                <FiPhone />
                Phone Number (Optional)
              </Label>
              <Input
                type="tel"
                name="donor_phone"
                value={formData.donor_phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </FormGroup>

            <FormGroup>
              <Label>
                Personal Message (Optional)
              </Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Share why you're donating or leave a message of support..."
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={loading || currentAmount <= 0}>
              {loading ? (
                <>
                  <LoadingSpinner />
                  Processing...
                </>
              ) : (
                <>
                  <FiCreditCard />
                  Donate ₹{currentAmount.toLocaleString()}
                </>
              )}
            </SubmitButton>
          </Form>
        </DonationCard>

        <div style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
          <p>
            <strong>Secure Payment:</strong> Your donation is processed securely. 
            You will receive a tax-deductible receipt via email.
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            All donations are used directly for our charitable activities and community programs.
          </p>
        </div>
      </DonateContent>
    </DonateContainer>
  );
};

export default Donate;