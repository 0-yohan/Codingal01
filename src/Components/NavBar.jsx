import React, { useState, useEffect } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import EndSessionModal from './EndSessionModal';
import Icon from '../assets/logo-christmas.png';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleEndSession();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEndSession = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmEndSession = (reason) => {
    console.log("Session ended with reason:", reason);
    // Implement your logic for ending the session here
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
    <nav className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* Desktop view */}
            <div className="hidden lg:flex items-center">
            <a href="/"><img className="h-8 w-auto" src={Icon} alt="Logo Icon" /> </a>
              <span className="text-gray-700 font-thin text-4xl px-4">l</span>
              <span className="text-gray-700 font-semibold text-base">Trail Lesson [Grade 3-7]</span>
            </div>
            {/* Mobile view */}
            <a href="/"><img 
              className="lg:hidden h-8 w-auto" 
              src="https://www.codingal.com/resources/wp-content/uploads/2021/03/Codingal-logo-with-text.svg" 
              alt="Codingal Logo" 
            /></a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-8 ">
            <div className="text-gray-700 font-bold text-lg">{formatTime(timeLeft)}</div>
            <button
              onClick={handleEndSession}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
            >
              End Session
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-lg p-8 flex flex-col justify-start">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xl"></span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flex flex-col space-y-4 ">
            <div className="text-gray-700 font-bold text-lg text-center">{formatTime(timeLeft)}</div>
            <button
              onClick={handleEndSession}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              End Session
            </button>
          </div>
        </div>
      </div>
    </nav>
    <EndSessionModal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    onEndSession={handleConfirmEndSession}
  />
  </>
  );
};

export default NavBar;

