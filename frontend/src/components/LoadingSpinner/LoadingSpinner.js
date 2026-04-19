import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 2rem;
`;

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid ${props => props.theme.colors.backgroundAlt};
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;