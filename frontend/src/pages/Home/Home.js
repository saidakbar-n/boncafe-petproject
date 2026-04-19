import React from 'react';
import Hero from '../../components/Hero/Hero';
import FeaturedMenu from '../../components/FeaturedMenu/FeaturedMenu';
import About from '../../components/About/About';
import Testimonials from '../../components/Testimonials/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedMenu />
      <About />
      <Testimonials />
    </>
  );
};

export default Home;