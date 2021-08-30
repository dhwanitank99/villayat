import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Spinner from './Common/Spinner';
import Footer from './Footer';
import findCandidate from './Helpers/findCandidate';

const HomeComponent: React.FC = (props) => {
  const router = useRouter();
  const [recordID, setRecordID] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleClick = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (recordID) {
      setLoading(true);
      let isPresent: boolean;

      const searchCandidate = async () => {
        isPresent = await findCandidate(recordID);

        if (isPresent) {
          router.push(`/candidate/${recordID}`);
        } else {
          setIsInvalid(true);
          setLoading(false);
        }
      };

      searchCandidate();
    } else {
      setIsInvalid(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInvalid(false);
    setRecordID(e.target.value);
  };

  return (
    <>
      <div className='min-h-screen w-screen flex items-center justify-center bg-gray-50 rounded'>
        <div className='lg:w-1/4 flex flex-col shadow-xl'>
          <div className='py-10 px-14 bg-gradient-to-r from-gray-200 to-slate-gray text-center space-y-8'>
            <div className='w-full h-20 relative'>
              <Image
                src='/logo-blue.png'
                className='object-contain'
                layout='fill'
              />
            </div>
          </div>
          <div className='flex flex-col py-10 px-10 space-y-5 bg-white'>
            <div className='text-center'>
              <input
                type='text'
                placeholder='Enter ID'
                onChange={handleChange}
                className={`w-full px-2 py-2 text-gray-800 font-medium border-2 rounded-md border-gray-200 focus:outline-none focus:ring-1 focus:ring-cadet-blue focus:border-transparent ${
                  isInvalid ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              <div className='h-2 my-1 text-xs text-red-400'>
                {isInvalid && 'Please enter a valid ID'}
              </div>
            </div>
            <button
              onClick={handleClick}
              className='w-full py-3 bg-cadet-blue text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cadet-blue focus:border-transparent shadow-lg'>
              {loading ? <Spinner wrapped={true} /> : 'Enter'}
            </button>
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 w-screen lg:w-full border-t border-gray-200'>
        <Footer />
      </div>
    </>
  );
};

export default HomeComponent;
