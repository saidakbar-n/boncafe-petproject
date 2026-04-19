import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiMapPin, FiStar, FiMessageCircle } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { branchesAPI, getMediaUrl, handleApiError } from '../../services/api';
import {
  BranchesContainer,
  BranchesHeader,
  BranchesTitle,
  BranchesSubtitle,
  BranchesGrid,
  BranchCard,
  BranchImage,
  BranchContent,
  BranchName,
  BranchAddress,
  BranchRating,
  BranchActions,
  ActionButton
} from './Branches.styles';

const Branches = () => {
  const { t } = useTranslation();
  const [branches, setBranches] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBranchesData();
  }, []);

  const fetchBranchesData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch branches and reviews in parallel
      const [branchesResponse, reviewsResponse] = await Promise.all([
        branchesAPI.getBranches(),
        branchesAPI.getBranchReviews()
      ]);
      
      setBranches(branchesResponse.data);
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error('Error fetching branches data:', error);
      const errorMessage = handleApiError(error, 'Failed to load branches data');
      setError(errorMessage);
      
      // Fallback to empty arrays instead of mock data to ensure proper Django integration
      setBranches([]);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const getBranchReviews = (branchId) => {
    return reviews.filter(review => review.branch === branchId);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <BranchesContainer>
        <BranchesHeader>
          <BranchesTitle>{t('branches.title')}</BranchesTitle>
          <div style={{ color: '#e74c3c', textAlign: 'center', padding: '2rem' }}>
            {error}
          </div>
        </BranchesHeader>
      </BranchesContainer>
    );
  }

  return (
    <BranchesContainer>
      <BranchesHeader
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BranchesTitle>{t('branches.title')}</BranchesTitle>
        <BranchesSubtitle>{t('branches.subtitle')}</BranchesSubtitle>
      </BranchesHeader>

      <BranchesGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {branches.map((branch) => {
          const branchReviews = getBranchReviews(branch.id);
          const reviewCount = branch.review_count || branchReviews.length;
          const averageRating = branch.average_rating || 0;
          
          return (
            <motion.div key={branch.id} variants={itemVariants}>
              <BranchCard
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <BranchImage>
                  <img 
                    src={getMediaUrl(branch.photos) || '/images/placeholder-branch.svg'} 
                    alt={branch.name}
                    onError={(e) => {
                      e.target.src = '/images/placeholder-branch.svg';
                    }}
                  />
                </BranchImage>

                <BranchContent>
                  <BranchName>{branch.name}</BranchName>
                  
                  <BranchAddress>
                    <FiMapPin />
                    {branch.address || t('branches.noAddress')}
                  </BranchAddress>

                  <BranchRating>
                    <div className="stars">
                      {renderStars(averageRating)}
                    </div>
                    <span className="rating-text">
                      {averageRating.toFixed(1)} ({reviewCount} {t('branches.reviews')})
                    </span>
                  </BranchRating>

                  {/* Display recent reviews if available */}
                  {branch.recent_reviews && branch.recent_reviews.length > 0 && (
                    <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <FiMessageCircle style={{ marginRight: '0.5rem' }} />
                        {t('branches.recentReviews')}:
                      </div>
                      {branch.recent_reviews.slice(0, 2).map((review, index) => (
                        <div key={review.id} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <div style={{ display: 'flex', marginRight: '0.5rem' }}>
                              {renderStars(review.stars)}
                            </div>
                            <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                              {review.customer_display}
                            </span>
                          </div>
                          {review.message && (
                            <div style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
                              "{review.message.length > 100 ? review.message.substring(0, 100) + '...' : review.message}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <BranchActions>
                    {branch.google_maps_url && (
                      <ActionButton
                        href={branch.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiMapPin />
                        {t('branches.viewOnMap')}
                      </ActionButton>
                    )}
                  </BranchActions>
                </BranchContent>
              </BranchCard>
            </motion.div>
          );
        })}
      </BranchesGrid>

      {branches.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          {t('branches.noBranches')}
        </div>
      )}
    </BranchesContainer>
  );
};

export default Branches;