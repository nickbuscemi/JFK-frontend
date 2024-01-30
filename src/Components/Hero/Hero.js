
import { DonationButton } from "../Stripe/DonationButton";
import { HeroCarouselObj } from './HeroComponents/HeroAssets';
import { useLocation } from 'react-router-dom';
import './Hero.css'

export const Hero = () => {

  const location = useLocation();
  const path = location.pathname;

  let currentItem;

  const pathToIndexMap = {
    '/': 0,
    '/about': 1,  
    '/impact': 2,  
    '/events': 3, 
  };

  const index = pathToIndexMap[path];

  if (index !== undefined) {
    currentItem = HeroCarouselObj[index];
  } else {
    currentItem = HeroCarouselObj[0]; 
  }

  const isHomePage = currentItem === HeroCarouselObj[0];

  return (
    <div>
      <section>
        <div className="hero min-h-screen flex justify-center items-center text-white md:animate-backgroundPanning" style={{
          backgroundImage: `url(${window.innerWidth <= 640 ? currentItem.mobileSrc : currentItem.src})`,
          backgroundSize: 'cover', 
          backgroundRepeat: 'no-repeat',
          }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content flex flex-col justify-center items-center">
            <div className="max-w-md mt-28">
              <div>
                <h1 className="mb-5 text-5xl font-bold">{currentItem.title}</h1>
              </div>
              <p className="mb-5 text-xl font-bold">{currentItem.caption}</p>
              {isHomePage && (
                <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                  <DonationButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
  </div>
  );
};