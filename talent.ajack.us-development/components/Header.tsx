import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DarkModeToggle from './DarkModeToggle';

interface headerProps {
  applicantID?: number;
}

const Header: React.FC<headerProps> = () => {
  const router = useRouter();
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    if (window?.history?.length > 1) {
      setShowBack(true);
    } else {
      setShowBack(false);
    }
    return () => {
      setShowBack(false);
    };
  }, []);

  return (
    <>
      <div
        className={`relative w-full ${
          !showBack ? 'h-16' : 'h-auto'
        } py-0 px-4 flex justify-${
          showBack ? 'between' : 'center'
        } items-center bg-cadet-blue shadow-md`}>
        {showBack && (
          <div className=''>
            <button
              title='Go Back'
              aria-label={'back'}
              onClick={() => router.back()}
              className='w-6 md:w-14 lg:w-16 h-10 lg:h-12 py-2 px-0 md:px-4 bg-transparent rounded hover:bg-cadet-blue-400 transition-colors duration-500 ease-in-out focus:outline-none'>
              <Image
                src='/icons/back-white.svg'
                width={50}
                height={50}
                layout='responsive'
              />
            </button>
          </div>
        )}
        <div className=' ml-70 pt-1 flex flex-1 justify-center'>
          <a href='https://ajackus.com/' target='_blank'>
            <div
              className='relative w-24 lg:w-32 h-9'
              title='Talent Management Platform'>
              <Image
                src='/logo.png'
                className='object-contain cursor-pointer'
                layout='fill'
              />
            </div>
          </a>
        </div>
        <DarkModeToggle />
      </div>
    </>
  );
};

export default Header;
