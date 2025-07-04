import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiDownload, FiHeart, FiShare2, FiHome } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const SuccessContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 120px 0 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const SuccessCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const CheckIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #27ae60, #229954);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  font-size: 2.5rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const DonationDetails = styled.div`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  margin: 2rem 0;
`;

const DonationAmount = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const DonationType = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
`;

const DonationInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  text-align: left;
  
  .label {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-weight: 600;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #3498db, #2980b9)' : 
    'transparent'
  };
  color: ${props => props.primary ? 'white' : '#3498db'};
  border: ${props => props.primary ? 'none' : '2px solid #3498db'};
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.primary ? 
      'linear-gradient(135deg, #2980b9, #21618c)' : 
      '#3498db'
    };
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ShareSection = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  margin-top: 2rem;
`;

const ShareTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ShareButton = styled.button`
  background: ${props => props.color || '#95a5a6'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const NextSteps = styled.div`
  text-align: left;
  margin-top: 2rem;
  
  h4 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  ul {
    color: #666;
    line-height: 1.8;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const DonationSuccess = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await axios.get(`/api/donations/${id}`);
        setDonation(response.data);
      } catch (error) {
        toast.error('Failed to load donation details');
        console.error('Error fetching donation:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDonation();
    }
  }, [id]);

  const handleDownloadReceipt = async () => {
    if (!donation) return;
    
    setDownloadingReceipt(true);
    try {
      const response = await axios.get(`/api/donations/${donation.id}/receipt`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `donation-receipt-${donation.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Receipt downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download receipt');
      console.error('Error downloading receipt:', error);
    } finally {
      setDownloadingReceipt(false);
    }
  };

  const handleShare = (platform) => {
    const message = `I just made a donation to UniteUp NGO! Join me in making a difference. 💝`;
    const url = window.location.origin;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(message)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <SuccessContainer>
        <SuccessContent>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <LoadingSpinner style={{ width: '40px', height: '40px' }} />
          </div>
        </SuccessContent>
      </SuccessContainer>
    );
  }

  if (!donation) {
    return (
      <SuccessContainer>
        <SuccessContent>
          <SuccessCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title>Donation Not Found</Title>
            <Subtitle>
              We couldn't find the donation details. Please check your email for the receipt.
            </Subtitle>
            <Link to="/" className="btn btn-primary">
              <FiHome />
              Go Home
            </Link>
          </SuccessCard>
        </SuccessContent>
      </SuccessContainer>
    );
  }

  return (
    <SuccessContainer>
      <SuccessContent>
        <SuccessCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CheckIcon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FiCheckCircle />
          </CheckIcon>
          
          <Title>Thank You for Your Donation!</Title>
          <Subtitle>
            Your generous contribution will make a real difference in our community. 
            We've sent a confirmation email with your receipt.
          </Subtitle>

          <DonationDetails>
            <DonationAmount>₹{parseFloat(donation.amount).toLocaleString()}</DonationAmount>
            <DonationType>{donation.donation_type}</DonationType>
            
            <DonationInfo>
              <InfoItem>
                <div className="label">Donation ID</div>
                <div className="value">#{donation.id}</div>
              </InfoItem>
              <InfoItem>
                <div className="label">Payment ID</div>
                <div className="value">{donation.payment_id}</div>
              </InfoItem>
              <InfoItem>
                <div className="label">Date</div>
                <div className="value">{new Date(donation.created_at).toLocaleDateString()}</div>
              </InfoItem>
              <InfoItem>
                <div className="label">Status</div>
                <div className="value">Completed</div>
              </InfoItem>
            </DonationInfo>
          </DonationDetails>

          <ActionButtons>
            <ActionButton 
              primary 
              onClick={handleDownloadReceipt}
              disabled={downloadingReceipt}
            >
              {downloadingReceipt ? (
                <>
                  <LoadingSpinner />
                  Downloading...
                </>
              ) : (
                <>
                  <FiDownload />
                  Download Receipt
                </>
              )}
            </ActionButton>
            
            <ActionButton as={Link} to="/donate">
              <FiHeart />
              Donate Again
            </ActionButton>
            
            <ActionButton as={Link} to="/">
              <FiHome />
              Go Home
            </ActionButton>
          </ActionButtons>

          <NextSteps>
            <h4>What Happens Next?</h4>
            <ul>
              <li>You'll receive an email confirmation with your tax-deductible receipt</li>
              <li>Your donation will be used directly for our community programs</li>
              <li>You'll get updates on how your contribution is making a difference</li>
              <li>Consider following us on social media for regular updates</li>
            </ul>
          </NextSteps>
        </SuccessCard>

        <ShareSection>
          <ShareTitle>
            <FiShare2 style={{ marginRight: '0.5rem' }} />
            Spread the Word
          </ShareTitle>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Help us reach more people by sharing your donation on social media!
          </p>
          
          <ShareButtons>
            <ShareButton 
              color="#3b5998" 
              onClick={() => handleShare('facebook')}
            >
              Facebook
            </ShareButton>
            <ShareButton 
              color="#1da1f2" 
              onClick={() => handleShare('twitter')}
            >
              Twitter
            </ShareButton>
            <ShareButton 
              color="#0077b5" 
              onClick={() => handleShare('linkedin')}
            >
              LinkedIn
            </ShareButton>
            <ShareButton 
              color="#25d366" 
              onClick={() => handleShare('whatsapp')}
            >
              WhatsApp
            </ShareButton>
          </ShareButtons>
        </ShareSection>
      </SuccessContent>
    </SuccessContainer>
  );
};

export default DonationSuccess;