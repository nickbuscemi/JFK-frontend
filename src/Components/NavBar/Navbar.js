import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { FiMenu, FiArrowRight } from "react-icons/fi";
import { NavLink as RouterNavLink, useMatch, useResolvedPath } from 'react-router-dom';
import { DonationButton } from "../Stripe/DonationButton";
import killeenlogolight from '../../assets/images/killeenlogolight.jpg';
import killeenlogo from '../../assets/images/killeenlogo.jpg';
import './NavBar.css';

export const FlipNavWrapper = () => {
  return (
    <div className="bg-transparent">
      <FlipNav />
    </div>
  );
};

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMouseNearTop, setIsMouseNearTop] = useState(false);
  const [activeLink, setActiveLink] = useState('/'); // Default active link


  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleMouseMove = (e) => {
    setIsMouseNearTop(e.clientY < 100);
  }

  const handleResize = () => {
    if (window.innerWidth > 640) { // Adjust the breakpoint as needed
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    
    <nav className={`navbar-fixed ${!isScrolled || isMouseNearTop ? 'visible' : 'hidden'}`}>
      <nav className={`flex justify-between items-center bg-transparent w-full max-w-screen-xl mx-auto py-6 md:py-6 lg:py-12 ${isScrolled ? 'scrolled-nav' : ''}`}>
        <div className="flex-1 flex justify-start gap-20">
          <Link to="/" className="sm:pl-6 hidden lg:block">
            <img src={killeenlogo} style={{ width: '180px', height: 'auto' }} alt="Ribbon Logo" />
          </Link>
          <NavLeft setIsOpen={setIsOpen} setActiveLink={setActiveLink} activeLink={activeLink}/>
          <NavMenu isOpen={isOpen} setIsOpen={setIsOpen} setActiveLink={setActiveLink}/>
        </div>      
        {/*<div className="flex flex-col items-center">
          <NavLeft setIsOpen={setIsOpen} />
          <NavMenu isOpen={isOpen} />
        </div>*/}
        <div className="flex-1 flex justify-end items-center gap-8">
          <NavLink className="hidden lg:block" text="Contact" href="/contact" />
          <div className="pr-6 sm:pr-6 md:pr-6"> 
            <DonationButton />
          </div>
        </div>
      </nav>
    </nav>
  );
};

const NavLinks = ({ isMenu = false, setActiveLink, activeLink, setIsOpen }) => {
  // Apply "hidden sm:flex" classes if it's in the menu, else "hidden lg:flex" for the main navbar
  const linkClass = isMenu ? "block" : "hidden lg:block";
  const homeLinkClass = `${isMenu ? "block" : "hidden lg:hidden"}`;
  const contactLinkClass = isMenu ? "block" : "hidden";

  const handleClick = (link) => {
    setActiveLink(link);
    if (isMenu) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <NavLink text="Home" href="/" className={homeLinkClass} isActive={activeLink === '/'} onClick={() => handleClick('/')} />
      <NavLink text="About" href="/about" className={linkClass} isActive={activeLink === '/about'} onClick={() => handleClick('/about')} />
      <NavLink text="Impact" href="/impact" className={linkClass} isActive={activeLink === '/impact'} onClick={() => handleClick('/impact')} />
      <NavLink text="Events" href="/events" className={linkClass} isActive={activeLink === '/events'} onClick={() => handleClick('/events')}/>
      <NavLink text="Contact" href="/contact" className={contactLinkClass} isActive={activeLink === '/contact'} onClick={() => handleClick('/contact')}/>
    </>
  );
};

const NavLeft = ({ setIsOpen, setActiveLink, activeLink }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pl-6 block lg:hidden text-gray-950 text-2xl"
        onClick={() => setIsOpen((pv) => !pv)}
      >
      <FiMenu />
      </motion.button>
      <NavLinks isMenu={false} setActiveLink={setActiveLink} activeLink={activeLink}/>
    </div>
  );
};


const NavLink = ({ text, href, className, isMenu, onClick }) => {
  let resolved = useResolvedPath(href);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <RouterNavLink
      to={href}
      className={`${className} h-[30px] overflow-hidden font-extrabold ${match ? 'active-link' : ''}`}
      onClick={onClick}    
    >
      {isMenu ? (
        <span className="flex items-center h-[30px]">{text}</span>
      ) : (
        <motion.div whileHover={{ y: -30 }}>
          <span className="flex items-center h-[30px] text-purple-500">{text}</span>
          <span className="flex items-center h-[30px] text-purple-600">{text}</span>
        </motion.div>
      )}
    </RouterNavLink>
  );
};

const NavMenu = ({ isOpen, setIsOpen, setActiveLink }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="fixed p-6 mt-[-6px] top-20 left-0 right-0 bg-deepCarolina text-white z-50 flex flex-col overflow-hidden"
      style={{ width: '100%' }} // Ensure the menu is full width
    >
      <NavLinks isMenu={true} setIsOpen={setIsOpen} setActiveLink={setActiveLink}/>
    </motion.div>
  );
};

const MenuLink = ({ text }) => {
  return (
    <motion.a
      variants={menuLinkVariants}
      rel="nofollow"
      href="#"
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-gray-950" />
      </motion.span>
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-indigo-600">
          {text}
        </span>
      </motion.div>
    </motion.a>
  );
};

/*const menuVariants = {
  open: {
    scaleY: 1,
    originY: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    originY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};*/
const menuVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.3
    },
    display: "block",
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.3
    },
    transitionEnd: {
      display: "none",
    },
  }
};


const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};