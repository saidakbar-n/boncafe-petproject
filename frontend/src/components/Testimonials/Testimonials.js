import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  TestimonialsContainer,
  TestimonialsHeader,
  TestimonialsTitle,
  TestimonialsCarousel,
  TestimonialCard,
  TestimonialContent,
  TestimonialText,
  TestimonialAuthor,
  TestimonialRating,
  CarouselControls,
  CarouselButton,
  CarouselDots,
  CarouselDot
} from './Testimonials.styles';

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock testimonials data - in real app, this would come from API
  const testimonials = [
    {
      id: 1,
      text: "Amazing coffee and cozy atmosphere! The staff is incredibly friendly and the pastries are to die for. This has become my go-to spot for morning coffee.",
      author: "Sarah Johnson",
      rating: 5,
      branch: "Downtown"
    },
    {
      id: 2,
      text: "Best cafe in the city! The quality of coffee is exceptional and the interior design creates such a warm, welcoming environment. Highly recommend!",
      author: "Michael Chen",
      rating: 5,
      branch: "Mall Location"
    },
    {
      id: 3,
      text: "Perfect place for work meetings or just relaxing with friends. Great WiFi, comfortable seating, and the menu has something for everyone.",
      author: "Emma Rodriguez",
      rating: 5,
      branch: "City Center"
    }
  ];

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToTestimonial = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <TestimonialsContainer>
      <TestimonialsHeader
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <TestimonialsTitle>{t('testimonials.title')}</TestimonialsTitle>
      </TestimonialsHeader>

      <TestimonialsCarousel>
        <TestimonialCard
          as={motion.div}
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            
            if (swipe < -10000) {
              nextTestimonial();
            } else if (swipe > 10000) {
              prevTestimonial();
            }
          }}
        >
          <TestimonialContent>
            <TestimonialRating>
              {renderStars(testimonials[currentIndex].rating)}
            </TestimonialRating>
            
            <TestimonialText>
              "{testimonials[currentIndex].text}"
            </TestimonialText>
            
            <TestimonialAuthor>
              <strong>{testimonials[currentIndex].author}</strong>
              <span>{testimonials[currentIndex].branch}</span>
            </TestimonialAuthor>
          </TestimonialContent>
        </TestimonialCard>

        <CarouselControls>
          <CarouselButton
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft />
          </CarouselButton>
          
          <CarouselButton
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight />
          </CarouselButton>
        </CarouselControls>
      </TestimonialsCarousel>

      <CarouselDots>
        {testimonials.map((_, index) => (
          <CarouselDot
            key={index}
            $isActive={index === currentIndex}
            onClick={() => goToTestimonial(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </CarouselDots>
    </TestimonialsContainer>
  );
};

export default Testimonials;