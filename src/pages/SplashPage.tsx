import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from '../components/Image';

const SplashPage = () => {
  const navigate = useNavigate();

  const handleAnimationComplete = useCallback(() => {
    navigate('/healthcare');
  }, [navigate]);

  return <Image onAnimationComplete={handleAnimationComplete} />;
};

export default SplashPage;
