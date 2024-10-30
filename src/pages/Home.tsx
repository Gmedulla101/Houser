import { useEffect } from 'react';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Featured from '../components/Featured';
import ExtraHomeText from '../components/ExtraHomeText';
import Footer from '../components/Footer';

const Home = () => {
  //SCROLL TO TOP ON COMPONENT MOUNT
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <main>
      <Header />
      <Hero />
      <Featured />
      <ExtraHomeText />
      <Footer />
    </main>
  );
};

export default Home;
