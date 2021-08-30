import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const DarkModeToggle: React.FC = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<Boolean>(false);
  const [iconSource, setIconSource] = useState('/icons/dark-mode-icon.svg');

  useEffect(() => {
    if (isDarkModeEnabled) {
      document.querySelector('body').className += 'dark';
    } else {
      document.querySelector('body').classList.remove('dark');
    }
  }, [isDarkModeEnabled]);

  useEffect(() => {
    const isDark = sessionStorage.getItem('dark') === '1' ? true : false;
    setIsDarkModeEnabled(isDark);
  }, []);

  const handleClick = () => {
    if (!isDarkModeEnabled) {
      setIsDarkModeEnabled(true);
      setIconSource('/icons/dark-mode-icon-white.svg');
      sessionStorage.setItem('dark', '1');
    } else {
      setIsDarkModeEnabled(false);
      setIconSource('/icons/dark-mode-icon.svg');
      sessionStorage.setItem('dark', '0');
    }
  };

  return (
    <div
      title='Toggle dark mode'
      onClick={handleClick}
      className='absolute top-2 md:top-1 lg:top-2 right-2 md:right-8 z-20 w-6 h-6 md:w-7 md:h-7 lg:w-8 md:h-8 rounded-full shadow-lg transform active:scale-90 transition-transform cursor-pointer'>
      <Image src={iconSource} layout='fill' />
    </div>
  );
};

export default DarkModeToggle;
