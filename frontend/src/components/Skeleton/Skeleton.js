import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.backgroundAlt} 0px,
    rgba(245, 230, 211, 0.8) 40px,
    ${props => props.theme.colors.backgroundAlt} 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${props => props.theme.borderRadius.md};
`;

const SkeletonText = styled(SkeletonBase)`
  height: ${props => props.height || '1rem'};
  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || '0.5rem 0'};
`;

const SkeletonCard = styled(SkeletonBase)`
  width: 100%;
  height: ${props => props.height || '300px'};
  border-radius: ${props => props.theme.borderRadius.xl};
`;

const SkeletonAvatar = styled(SkeletonBase)`
  width: ${props => props.size || '3rem'};
  height: ${props => props.size || '3rem'};
  border-radius: 50%;
`;

const SkeletonButton = styled(SkeletonBase)`
  width: ${props => props.width || '120px'};
  height: ${props => props.height || '40px'};
  border-radius: ${props => props.theme.borderRadius.full};
`;

export const MenuCardSkeleton = () => (
  <SkeletonCard>
    <div style={{ padding: '1.5rem' }}>
      <SkeletonText height="1.5rem" width="80%" />
      <SkeletonText height="1rem" width="100%" />
      <SkeletonText height="1rem" width="60%" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <SkeletonText height="1.25rem" width="60px" />
        <SkeletonButton width="100px" height="36px" />
      </div>
    </div>
  </SkeletonCard>
);

export const BranchCardSkeleton = () => (
  <SkeletonCard height="400px">
    <div style={{ padding: '1.5rem' }}>
      <SkeletonText height="1.5rem" width="70%" />
      <SkeletonText height="1rem" width="100%" />
      <SkeletonText height="1rem" width="40%" />
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <SkeletonButton width="120px" />
        <SkeletonButton width="100px" />
      </div>
    </div>
  </SkeletonCard>
);

export const TestimonialSkeleton = () => (
  <SkeletonCard height="250px">
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <SkeletonText height="1rem" width="100%" />
      <SkeletonText height="1rem" width="80%" />
      <SkeletonText height="1rem" width="90%" />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
        <SkeletonAvatar size="60px" />
      </div>
      <SkeletonText height="1rem" width="50%" margin="0 auto" />
    </div>
  </SkeletonCard>
);

export { SkeletonText, SkeletonCard, SkeletonAvatar, SkeletonButton };