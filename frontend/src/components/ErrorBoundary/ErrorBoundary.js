import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiAlertCircle } from 'react-icons/fi';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
  background-color: ${props => props.theme?.colors?.background || '#ffffff'};
  border-radius: ${props => props.theme?.borderRadius?.xl || '12px'};
  margin: 2rem auto;
  max-width: 500px;
`;

const ErrorIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: ${props => props.theme?.colors?.error || '#f44336'};
  color: ${props => props.theme?.colors?.white || '#ffffff'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  svg {
    font-size: 2rem;
  }
`;

const ErrorTitle = styled.h3`
  color: ${props => props.theme?.colors?.text || '#333333'};
  margin-bottom: 1rem;
  font-size: ${props => props.theme?.fontSizes?.xl || '1.5rem'};
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme?.colors?.textLight || '#666666'};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const RetryButton = styled(motion.button)`
  background: linear-gradient(135deg, 
    ${props => props.theme?.colors?.primary || '#8B6F47'}, 
    ${props => props.theme?.colors?.primaryLight || '#A67C52'}
  );
  color: ${props => props.theme?.colors?.white || '#ffffff'};
  padding: 1rem 2rem;
  border: none;
  border-radius: ${props => props.theme?.borderRadius?.lg || '8px'};
  font-weight: ${props => props.theme?.fontWeights?.medium || '500'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${props => props.theme?.fontSizes?.md || '1rem'};

  svg {
    font-size: 1.2rem;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorIcon>
            <FiAlertCircle />
          </ErrorIcon>
          <ErrorTitle>Something Went Wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but something unexpected happened while loading this page. Please try refreshing or visit our homepage to continue browsing our cafe.
          </ErrorMessage>
          <RetryButton
            onClick={this.handleRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw />
            Try Again
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;