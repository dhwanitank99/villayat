import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ScorePill from './Common/ScorePill';

interface sidebarProps {
  applicant: {}[];
}

const Sidebar: React.FC<sidebarProps> = (props) => {
  const { applicant } = props;
  const [translate, setTranslate] = useState('translate-y-12');
  const resume: string = applicant?.['Resume/Portfolio']?.[0]?.url || '';
  const thumbnail: string =
    applicant?.['Resume/Portfolio']?.[0]?.thumbnails?.large?.url || '';

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setTranslate('translate-y-0');
    }, 10);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    <div
      className={`mx-auto mb-0 lg:mb-8 max-w-lg lg:max-w-full w-full p-4 lg:p-0 lg:py-4 xl:p-4 bg-white dark:bg-gray-700 rounded shadow-lg transition-transform duration-500 ease-in-out transform ${translate}`}>
      <div className='relative w-36 h-36 shadow-md mx-auto overflow-hidden max-w-xs'>
        <a href={resume || undefined} target='_blank'>
          <Image
            src={thumbnail || `/icons/resume-fallback.svg`}
            className='object-scale-down p-4'
            layout='fill'
          />
        </a>
        {resume && (
          <div
            className={`absolute z-20 right-1 bottom-1 w-8 h-8 cursor-pointer`}>
            <Image src={`/icons/download-icon-dark.svg`} layout='fill' />
          </div>
        )}
      </div>
      <div className='w-full my-3'>
        {applicant['Full Name'] && (
          <p className='w-full text-center text-2xl font-title dark:text-gray-50'>
            {applicant['Full Name']}
          </p>
        )}
        {applicant[`Applying for (Title)`] && (
          <p className='w-full text-center text-md font-light font-title dark:text-gray-50'>
            {applicant[`Applying for (Title)`]}
          </p>
        )}
      </div>
      <div className='w-10/12 m-auto mt-10'>
        {applicant[`Experience (in years)`] && (
          <div className='w-full my-4 flex justify-around font-title dark:text-gray-50 '>
            <p className='w-4/5 text-sm'>{`Work Experience (in years)`}</p>
            <p className='w-1/5 text-right'>
              {applicant[`Experience (in years)`]}
            </p>
          </div>
        )}
        {applicant[`Available (in Days)`] && (
          <div className='w-full my-4 flex font-title dark:text-gray-50'>
            <p className='w-4/5 text-sm'>{`Available (in Days)`}</p>
            <p className='w-1/5 text-right'>
              {applicant[`Available (in Days)`]}
            </p>
          </div>
        )}
        {applicant[`Technology Agnostic`] && (
          <div className='w-full my-4 flex font-title dark:text-gray-50'>
            <p className='w-4/5 text-sm'>{`Technology Agnostic`}</p>
            <p className='w-1/5 text-right'>
              {applicant[`Technology Agnostic`] ? '✔' : '✖'}
            </p>
          </div>
        )}
        {applicant[`Remote Work`] && (
          <div className='w-full my-4 flex flex-col font-title dark:text-gray-50 '>
            <p className='mb-3 w-9/12 font-title font-semibold'>
              Want to work with remote teams?
            </p>
            <ScorePill
              text={applicant[`Remote Work`]}
              type='sidebar'
              color={'bg-blue-200'}
            />
          </div>
        )}
        {applicant[`Reason for Change`] && (
          <div className='w-full my-4 flex flex-col font-title dark:text-gray-50'>
            <p className='mb-3 w-9/12 font-title font-semibold'>
              Reason for change:
            </p>
            {applicant[`Reason for Change`].map((data, index) => {
              return (
                <ScorePill
                  type='sidebar'
                  color={'bg-red-200'}
                  text={data}
                  key={index}
                />
              );
            })}
          </div>
        )}
        {applicant[`Culture Fit`] && (
          <div className='w-full my-4 flex flex-col font-title dark:text-gray-50'>
            <p className='mb-3 w-9/12 font-title font-semibold'>
              What matters most:
            </p>
            {applicant[`Culture Fit`].map((data, index) => {
              return (
                <ScorePill
                  key={index}
                  text={data}
                  type='sidebar'
                  color={'bg-green-200'}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
