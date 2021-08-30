import React, { useState, useEffect, SyntheticEvent } from 'react';

interface DescriptionProps {
  title: string;
  content: string;
  index: number;
}

const DescriptionContainer: React.FC<DescriptionProps> = (props) => {
  const { index, title, content } = props;
  const [translate, setTranslate] = useState('translate-x-12');
  const [showFullText, setShowFullText] = useState<Boolean>(false);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setTranslate('translate-x-0');
    }, 10);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  const handleClick = (event) => {
    if (showFullText) {
      event.target.previousSibling.classList.add(
        'line-clamp-3',
        'lg:line-clamp-3'
      );
      setShowFullText(false);
    } else {
      event.target.previousSibling.classList.remove(
        'line-clamp-3',
        'lg:line-clamp-3'
      );
      setShowFullText(true);
    }
  };

  return content ? (
    <div
      desc-name={title}
      className={`mb-3 lg:mb-4 ${
        index % 2 === 0 ? 'lg:mr-3' : 'lg:ml-3'
      } w-auto max-w-1/2 h-max px-6 py-3 flex-1 font-head bg-white dark:bg-gray-700 rounded overflow-hidden shadow-lg transition-transform duration-500 ease-in-out transform ${translate} `}>
      <div className='mb-2 font-title font-semibold text-xl text-gray-500 dark:text-gray-300 border-b border-gray-300'>
        {title}
      </div>
      <p
        className={`mt-3 mb-1 text-gray-500 dark:text-gray-200 text-base bg-white dark:bg-gray-700 ${
          showFullText ? '' : 'line-clamp-3 lg:line-clamp-3'
        } transition-all duration-1000`}>
        {content}
      </p>
      {content.length > 200 ? (
        <p
          className='w-max text-base text-gray-700 underline cursor-pointer active:outline-none'
          onClick={handleClick}>
          {showFullText ? 'Read less' : 'Read more'}
        </p>
      ) : null}
    </div>
  ) : null;
};

export default DescriptionContainer;
