import React, { useState, useEffect } from 'react';

interface NoteProps {
  score: number;
  evaluatedOn: string;
}

interface PillDetail {
  bgColor: string;
  textColor: string;
  review: string;
  reviewColor?: string;
}

const AssignmentNote: React.FC<NoteProps> = (props) => {
  const { score, evaluatedOn } = props;
  const [PillDetails, setPillDetails] = useState<PillDetail>({
    bgColor: '',
    textColor: '',
    review: '',
    reviewColor: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    let currentPillDetails: PillDetail;
    currentPillDetails = getPillDetails(score);
    if (currentPillDetails) {
      setPillDetails(currentPillDetails);
      setLoading(false);
    }
    setLoading(false);

    return () => {
      setPillDetails(null);
      setLoading(false);
    };
  }, [score]);

  return (
    !loading && (
      <div className='m-4 w-72 max-w-xs p-4 flex justify-between shadow-md'>
        <div
          className={`score w-20 h-20 py-1 flex justify-center 2xl:items-baseline lg:items-center font-title ${PillDetails.textColor} text-6xl leading-none  rounded-full ${PillDetails.bgColor} `}>
          {score}
        </div>
        <div className='body w-2/3 flex flex-col items-center justify-around'>
          <div className='title text-center'>{evaluatedOn}</div>
          <div
            className={`review mt-2 font-title ${PillDetails.reviewColor} font-bold text-3xl`}>
            {PillDetails.review}
          </div>
        </div>
      </div>
    )
  );
};

const getPillDetails = (score: number) => {
  switch (score) {
    case 1:
      return {
        bgColor: 'bg-red-400',
        textColor: 'text-white',
        review: 'Not yet',
        reviewColor: 'text-red-400',
      };
    case 2:
      return {
        bgColor: 'bg-red-300',
        textColor: 'text-red-600',
        review: 'Average',
        reviewColor: 'text-red-600',
      };
    case 3:
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-600',
        review: 'Good',
        reviewColor: 'text-yellow-600',
      };
    case 4:
      return {
        bgColor: 'bg-green-300',
        textColor: 'text-green-600',
        review: 'Excellent',
        reviewColor: 'text-green-600',
      };

    default:
      return { bgColor: 'bg-black', textColor: 'text-white', review: '' };
  }
};

export default AssignmentNote;
