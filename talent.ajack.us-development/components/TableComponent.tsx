import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ScorePill from '@/components/Common/ScorePill';
import Tooltip from '@common/Tooltip';
import { getCleanData } from './Helpers/getCleanData';

interface TableProps {
  name: string;
  content: {}[];
}

const TableComponent: React.FC<TableProps> = (props) => {
  const { name, content } = props;
  const { parameterKeys, parameterObjects, cleanedData } =
    getCleanData(content);
  const [translate, setTranslate] = useState('translate-y-12');

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setTranslate('translate-y-0');
    }, 10);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  return cleanedData.length > 0 ? (
    <div
      className={`w-full mt-4 lg:mt-0 mb-8 flex flex-col items-center transition-transform duration-500 ease-in-out transform ${translate}`}>
      <div className='self-start font-head text-2xl text-gray-500 dark:text-gray-200 font-semibold'>
        {name}
      </div>
      <div className='m-4 w-full shadow-lg overflow-x-scroll lg:overflow-visible'>
        <table className='table-fixed min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-200 dark:bg-gray-700'>
            <tr>
              <th
                scope='col'
                className={`w-1/${
                  cleanedData?.length + 1
                } px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-100 uppercase tracking-wider`}>
                Reviewer
              </th>
              {cleanedData?.map((data, index) => (
                <th
                  key={index}
                  scope='col'
                  className={`w-1/${
                    cleanedData.length + 1
                  } px-4 py-1.5 lg:px-6 lg:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-normal lg:tracking-wider`}>
                  <div className='flex items-center w-full'>
                    <div className='relative h-6 w-6 flex flex-col items-center group cursor-pointer'>
                      <Image
                        src={
                          data?.nextStage
                            ? `/icons/check.svg`
                            : `/icons/cross.svg`
                        }
                        layout='fill'
                      />
                      <Tooltip text='Go to next stage' />
                    </div>
                    <div className='ml-4'>
                      <div className='text-xs lg:text-sm text-gray-900 dark:text-gray-100'>
                        {data?.reviewer}
                      </div>
                      <div className='text-gray-500 dark:text-gray-100'>
                        {data?.createdOn}
                      </div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-600 divide-y divide-gray-100'>
            {parameterKeys.map((key, i) => (
              <tr key={i}>
                <td className='px-6 py-4'>
                  <div className='text-xs lg:text-sm lg:font-medium text-gray-900 dark:text-gray-100'>
                    {key}
                  </div>
                </td>
                {parameterObjects.map((Obj, j) => (
                  <td key={j} className='px-6 py-4'>
                    <div className='text-xs lg:text-sm font-medium text-gray-900'>
                      <ScorePill score={Obj[key]} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            <tr className='bg-gray-100 dark:bg-gray-600'>
              <td className='px-6 py-4'>
                <div className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                  Comments
                </div>
              </td>
              {cleanedData?.map((data, index) => (
                <td key={index} className='px-6 py-4'>
                  <div className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                    {data?.notes}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : null;
};

export default TableComponent;
