import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiStar, FiMessageCircle } from 'react-icons/fi';
import { branchesAPI, handleApiError } from '../../services/api';
import {
  ContactContainer,
  ContactHeader,
  ContactTitle,
  ContactSubtitle,
  ContactContent,
  ContactInfo,
  InfoCard,
  InfoIcon,
  InfoTitle,
  InfoText,
  ContactForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  SubmitButton,
  ReviewSection,
  ReviewHeader,
  ReviewTitle,
  ReviewSubtitle,
  ReviewForm,
  FormSelect,
  RatingGroup,
  RatingStars,
  StarButton,
  RatingLabel,
  SuccessMessage,
  ErrorMessage
} from './Contact.styles';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [reviewData, setReviewData] = useState({
    branch: '',
    rating: 0,
    name: '',
    email: '',
    message: ''
  });

  const [branches, setBranches] = useState([]);
  const [reviewStatus, setReviewStatus] = useState({ type: '', message: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await branchesAPI.getBranches();
      setBranches(response.data);
    } catch (error) {
      console.error('Error fetching branches:', error);
      // Set fallback branches if API fails
      setBranches([
        { id: 1, name: 'Downtown Branch' },
        { id: 2, name: 'Mall Location' },
        { id: 3, name: 'City Center' }
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setReviewData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewData.branch || !reviewData.rating || !reviewData.name || !reviewData.message) {
      setReviewStatus({
        type: 'error',
        message: t('contact.review.required')
      });
      return;
    }

    setIsSubmittingReview(true);
    setReviewStatus({ type: '', message: '' });

    try {
      // Prepare data for backend API
      const submitData = {
        branch: parseInt(reviewData.branch),
        stars: reviewData.rating,
        customer_name: reviewData.name,
        customer_email: reviewData.email || null,
        message: reviewData.message,
        source: 'web'
      };

      // Submit review to backend
      const response = await branchesAPI.submitReview(submitData);
      
      if (response.data.success) {
        setReviewStatus({
          type: 'success',
          message: response.data.message || t('contact.review.success')
        });

        // Reset form
        setReviewData({
          branch: '',
          rating: 0,
          name: '',
          email: '',
          message: ''
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setReviewStatus({ type: '', message: '' });
        }, 5000);
      } else {
        throw new Error(response.data.message || 'Submission failed');
      }

    } catch (error) {
      console.error('Error submitting review:', error);
      
      let errorMessage = t('contact.review.error');
      
      // Handle specific backend validation errors
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (errors.non_field_errors) {
          errorMessage = errors.non_field_errors[0];
        } else if (errors.customer_name) {
          errorMessage = errors.customer_name[0];
        } else if (errors.stars) {
          errorMessage = errors.stars[0];
        } else if (errors.message) {
          errorMessage = errors.message[0];
        } else {
          // Get first error message
          const firstError = Object.values(errors)[0];
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
          }
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setReviewStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const contactInfo = [
    {
      icon: FiPhone,
      title: t('contact.phone'),
      text: '+998 (90) 123-45-67'
    },
    {
      icon: FiMail,
      title: t('contact.email'),
      text: 'info@boncafe.uz'
    },
    {
      icon: FiMapPin,
      title: t('contact.address'),
      text: 'Amir Temur Street 15, Tashkent, Uzbekistan'
    },
    {
      icon: FiClock,
      title: t('contact.hours'),
      text: 'Mon-Sun: 7:00 AM - 10:00 PM'
    }
  ];

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

  return (
    <ContactContainer>
      <ContactHeader
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ContactTitle>{t('contact.title')}</ContactTitle>
        <ContactSubtitle>{t('contact.subtitle')}</ContactSubtitle>
      </ContactHeader>

      <ContactContent
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ContactInfo>
          {contactInfo.map((info, index) => (
            <motion.div key={index} variants={itemVariants}>
              <InfoCard>
                <InfoIcon>
                  <info.icon />
                </InfoIcon>
                <div>
                  <InfoTitle>{info.title}</InfoTitle>
                  <InfoText>{info.text}</InfoText>
                </div>
              </InfoCard>
            </motion.div>
          ))}
        </ContactInfo>

        <motion.div variants={itemVariants}>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="message">Message</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiSend />
              Send Message
            </SubmitButton>
          </ContactForm>
        </motion.div>
      </ContactContent>

      <ReviewSection>
        <ReviewHeader
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ReviewTitle>
            <FiMessageCircle />
            {t('contact.review.title')}
          </ReviewTitle>
          <ReviewSubtitle>{t('contact.review.subtitle')}</ReviewSubtitle>
        </ReviewHeader>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ReviewForm onSubmit={handleReviewSubmit}>
            {reviewStatus.message && (
              reviewStatus.type === 'success' ? (
                <SuccessMessage>
                  <FiStar />
                  {reviewStatus.message}
                </SuccessMessage>
              ) : (
                <ErrorMessage>
                  {reviewStatus.message}
                </ErrorMessage>
              )
            )}

            <FormGroup>
              <FormLabel htmlFor="branch">{t('contact.review.branch')}</FormLabel>
              <FormSelect
                id="branch"
                name="branch"
                value={reviewData.branch}
                onChange={handleReviewInputChange}
                required
              >
                <option value="">{t('contact.review.selectBranch')}</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>

            <RatingGroup>
              <FormLabel>{t('contact.review.ratingLabel')}</FormLabel>
              <RatingStars>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarButton
                    key={star}
                    type="button"
                    $filled={star <= reviewData.rating}
                    onClick={() => handleRatingChange(star)}
                    aria-label={`${star} ${star === 1 ? 'star' : 'stars'}`}
                  >
                    <FiStar />
                  </StarButton>
                ))}
              </RatingStars>
              <RatingLabel>
                {reviewData.rating > 0 && `${reviewData.rating}/5 ${t('branches.reviews')}`}
              </RatingLabel>
            </RatingGroup>

            <FormGroup>
              <FormLabel htmlFor="reviewName">{t('contact.review.name')}</FormLabel>
              <FormInput
                type="text"
                id="reviewName"
                name="name"
                value={reviewData.name}
                onChange={handleReviewInputChange}
                placeholder={t('contact.review.namePlaceholder')}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="reviewEmail">{t('contact.review.email')}</FormLabel>
              <FormInput
                type="email"
                id="reviewEmail"
                name="email"
                value={reviewData.email}
                onChange={handleReviewInputChange}
                placeholder={t('contact.review.emailPlaceholder')}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="reviewMessage">{t('contact.review.message')}</FormLabel>
              <FormTextarea
                id="reviewMessage"
                name="message"
                rows="4"
                value={reviewData.message}
                onChange={handleReviewInputChange}
                placeholder={t('contact.review.messagePlaceholder')}
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmittingReview}
              as={motion.button}
              whileHover={{ scale: isSubmittingReview ? 1 : 1.05 }}
              whileTap={{ scale: isSubmittingReview ? 1 : 0.95 }}
            >
              <FiStar />
              {isSubmittingReview ? t('common.processing') : t('contact.review.submit')}
            </SubmitButton>
          </ReviewForm>
        </motion.div>
      </ReviewSection>

    </ContactContainer>
  );
};

export default Contact;