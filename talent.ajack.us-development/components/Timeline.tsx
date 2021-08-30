import React from 'react';
import ReactMarkdown from 'react-markdown';

interface TimelineProps {
  stageData?: {
    id?: string;
    name: string;
    notes: string;
    order: number;
    stage?: string[];
    completion: string;
  }[];
}

const Timeline: React.FC<TimelineProps> = (props) => {
  const { stageData } = props;

  return (
    <div className='relative mx-auto mt-8 w-max md:w-max min-h-full p-4 pb-16 flex flex-col items-center overflow-scroll md:overflow-auto'>
      {stageData?.map((data, index) => {
        return data.completion === 'complete' ? (
          <div
            key={index}
            className={`w-full flex ${
              index === 0 ? 'items-start' : 'items-center'
            }`}>
            <div className='flex flex-col items-center'>
              {index !== 0 && (
                <div className='mx-4 w-0.5 py-2 bg-cyber-grape dark:bg-slate-gray'></div>
              )}
              <div
                title='Complete'
                className='rounded-full bg-cadet-blue w-8 h-8'></div>
              {!(index === stageData.length - 1) && (
                <div className='mx-4 w-0.5 py-2 bg-cyber-grape dark:bg-slate-gray'></div>
              )}
            </div>
            <div className='mx-4 dark:text-gray-100 max-w-tiny lg:max-w-6xl text-sm lg:text-lg'>
              {data.name}
            </div>
          </div>
        ) : data.completion === 'partial' ? (
          <div
            key={index}
            className={`w-full ${
              index === 0 || index === stageData.length - 1
                ? 'h-16'
                : 'h-max max-h-80 '
            } flex items-center box-border`}>
            <div className='relative flex flex-col self-stretch'>
              {index !== 0 ? (
                <div
                  className={`mx-4 w-0.5  ${
                    index === stageData.length - 1 ? 'h-2/4 mb-8' : 'h-full'
                  } bg-cyber-grape dark:bg-slate-gray`}></div>
              ) : null}
              <div
                title='Current'
                className='absolute top-1/2 w-8 h-8 flex justify-center items-center bg-white rounded-full border-2 border-cadet-blue border-solid transform -translate-y-2/4'>
                <div className='rounded-full bg-cadet-blue-300 animate-pulse w-4 h-4'></div>
              </div>
              {index !== stageData.length - 1 && (
                <div
                  className={`mx-4 w-0.5 ${
                    index === 0 ? 'h-2/4 mt-8' : 'h-full'
                  } bg-gray-400 dark:bg-slate-gray`}></div>
              )}
            </div>
            <div
              className={`px-4 ${
                index === stageData.length - 1 ? 'mt-8' : 'py-4'
              } flex flex-col dark:text-gray-100`}>
              <p className='max-w-tiny lg:max-w-6xl font-title font-semibold text-cadet-blue text-xs md:text-sm lg:text-xl animate-pulse'>
                {data.name}
              </p>
              <ReactMarkdown
                components={{
                  ul: ({ node, ...props }) => (
                    <ul className='ml-4 max-w-tiny md:max-w-xl text-xs md:text-sm list-disc'>
                      {props.children}
                    </ul>
                  ),
                }}>
                {data.notes}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className={`w-full flex ${
              index === stageData.length - 1 ? 'items-end' : 'items-center'
            } dark:text-gray-100`}>
            <div className='flex flex-col items-center'>
              {index !== 0 ? (
                <div className='mx-4 w-0.5 py-2 bg-gray-400 dark:bg-slate-gray'></div>
              ) : null}
              <div
                title='Incomplete'
                className='rounded-full bg-gray-400 w-8 h-8'></div>
              {!(index === stageData.length - 1) && (
                <div className='mx-4 w-0.5 py-2 bg-gray-400 dark:bg-slate-gray'></div>
              )}
            </div>
            <div
              className={`mx-4 ${
                index === stageData.length - 1 ? 'mb-1' : ''
              } max-w-tiny md:max-w-md lg:max-w-6xl pr-4 text-sm lg:text-lg`}>
              {data.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
