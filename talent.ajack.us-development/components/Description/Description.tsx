import React from 'react';
import DescriptionContainer from './DescriptionContainer';

interface descriptionProps {
  applicant: {}[];
}

const Description: React.FC<descriptionProps> = (props) => {
  const { applicant } = props;
  const desc = [
    {
      title: 'Most Challenging Work',
      content: applicant[`Most Challenging Project (Teamwork)`],
    },
    {
      title: 'Short-term and Long-term goals',
      content: applicant[`Goals (Self-motivation)`],
    },
  ];
  return (
    <div className='w-full flex flex-col lg:flex-row justify-center'>
      {desc.map((data, index) => {
        return (
          <DescriptionContainer
            title={data.title}
            content={data.content}
            key={index}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default Description;
