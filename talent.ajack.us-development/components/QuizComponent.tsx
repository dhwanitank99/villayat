import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
//import Accordian from './Accordian';
interface QuizComponentProps {
  quizData?: {
    quizName: string;
    quizQA: { q: string; a: string }[];
    start: string;
    end: string;
    diff: {
      minutes?: string;
      seconds?: string;
    };
  };
}
const QuizComponent: React.FC<QuizComponentProps> = ({ quizData }) => {
  const [translate, setTranslate] = useState('translate-y-12');
  const [isShowing, setIsShowing] = useState(false);
  //const [showFullText, setShowFullText] = useState<Boolean>(false);
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setTranslate('translate-y-0');
    }, 10);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);
  const toggle = (event) => {
    if (isShowing) {
      event.target.classList.add('line-clamp-3');
      setIsShowing(false);
    } else {
      event.target.classList.remove('line-clamp-3');
      setIsShowing(true);
    }
  };
  // const handleClick = (event) => {
  //   if (showFullText) {
  //
  //     setShowFullText(false);
  //   } else {
  //     event.target.previousSibling.classList.remove(
  // };
  const getTimeDifference = (timeObject) => {
    let minutes = Math.round(+timeObject.minutes);
    let seconds = Math.round(+timeObject.seconds);
    if (minutes === 0) {
      return seconds + ' seconds';
    }
    if (minutes === 1 && seconds === 0) {
      return `${minutes} minute`;
    }
    if (minutes > 1 && seconds === 0) {
      return `${minutes} minutes`;
    }
    if (minutes > 1 && seconds > 1) {
      return `${minutes} minutes ${seconds} seconds`;
    }
  };
  return (
    <div
      className={`w-full mt-4 lg:mt-4 mb-8 flex flex-col items-center transition-transform duration-500 ease-in-out transform ${translate}`}>
      <div className='self-start font-head text-2xl text-gray-500 dark:text-gray-200 font-semibold'>
        Quiz: {quizData.quizName}
      </div>
      <p className="mt-3 mb-1 text-gray-500 dark:text-gray-200 text-base bg-white dark:bg-gray-700 line-clamp-3 lg:line-clamp-3 transition-all duration-1000">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>
      <button
        style={{
          width: '100%',
          position: 'relative',
          textAlign: 'left',
          padding: '4px',
          border: 'none',
          background: 'transparent',
          outline: 'none',
          cursor: 'pointer',
        }}
        onClick={toggle}
        type='button'>
        <p className='w-max text-base text-gray-700 underline active:outline-none'>
          {isShowing ? 'Less Info' : 'More info'}
        </p>
      </button>
      <div style={{ display: isShowing ? 'block' : 'none', padding: '5px' }}>
        <div className='my-4 w-full bg-white dark:bg-gray-700 flex justify-around shadow-md'>
          <div className='p-4 flex flex-col justify-center items-center'>
            <div className='w-full text-center font-bold text-gray-800 dark:text-gray-100'>
              Start Time
            </div>
            <div className='w-full text-gray-500 dark:text-gray-100'>
              {quizData.start}
            </div>
          </div>
          <div className='p-4 flex flex-col justify-center items-center'>
            <div className='w-full text-center font-bold text-gray-800 dark:text-gray-100'>
              End Time
            </div>
            <div className='w-full text-gray-500 dark:text-gray-100'>
              {quizData.end}
            </div>
          </div>
          <div className='p-4 flex flex-col justify-center items-center'>
            <div className='w-full text-center font-bold text-gray-800 dark:text-gray-100'>
              Time Taken
            </div>
            <div className='w-full text-gray-500 dark:text-gray-100'>
              {getTimeDifference(quizData.diff)}
            </div>
          </div>
        </div>
        <div className='mt-4 w-full font-head text-gray-700'>
          {quizData.quizQA.map((qa, index) => (
            <div key={'qa' + index + 1}>
              <div className='relative z-10 mt-4 w-full px-4 py-6 bg-white dark:bg-gray-700 shadow dark:text-gray-200'>
                <span className='font-bold'>Question {index + 1}</span>
                <div className='w-full px-2 mt-1 dark:text-gray-200'>
                  {ReactHtmlParser(qa.q)}
                </div>
              </div>
              <div className='relative z-0 w-full px-4 py-8 bg-gray-200 dark:bg-gray-600 dark:text-gray-50 shadow-inner'>
                Answer: {qa.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default QuizComponent;