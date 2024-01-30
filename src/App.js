import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import ScrollToTop from './utils/ScrollToTop';
import { FlipNavWrapper } from './Components/NavBar/Navbar';
import { Hero } from './Components/Hero/Hero'
import { Footer } from './Components/Footer/Footer';
import { About } from './Components/About/About';
import { Impact } from './Components/Impact/Impact';
import { Events } from './Components/Events/Events';
import { Home } from './Components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Contact } from './Components/Contact/Contact';
import { EventDetail } from './Components/Events/EventsComponents/EventDetail';
//import Payment from './Components/Stripe/Payment';
//import Completion from './Components/Stripe/Completion';


//import {loadStripe} from '@stripe/stripe-js';


function App() {

  return (
    <Router>
      <ScrollToTop />
      <div className='app-wrapper'>
        <FlipNavWrapper />
          <Routes>
            <Route path={"/"} 
              element={
                <>
                  <div className='background-image-wrapper'>
                    <Hero />
                  </div>
                  <Home />
                </>
            } 
            />
            <Route path="/about" element={
              <>
                <Hero />
                <About />
              </>
            }
            />
            <Route path="/Impact" element={
              <>
                <Hero />
                <Impact />
              </>
            }
            />
            <Route path="/events" element={
              <>
                <Hero />
                <Events />
              </>
            }
            />
            <Route path="/events/:eventName" element={
              <>
                <EventDetail />
              </>
            }
            />
            <Route path="/contact" element={
              <>
                <Contact />
              </>
            }
            />
            {/*<Route path="/test" element={<Payment stripePromise={stripePromise} />} />
            <Route path="/completion" element={<Completion stripePromise={stripePromise} />} />*/}
          </Routes>
          
        <div className='footer-wrapper'>
          <Footer />
          </div>
      </div>
    </Router>
    
  )
}

export default App;