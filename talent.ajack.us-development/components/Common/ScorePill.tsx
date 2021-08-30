import React, { useEffect, useState } from 'react';
import { getPillDetails } from '../Helpers/getPillDetails';
interface PillProps {
  score?: number;
  type?: string;
  color?: string;
  text?: string;
}
interface PillDetail {
  bgColor: string;
  review: string;
  reviewColor?: string;
  noScore?: boolean;
}

const ScorePill: React.FC<PillProps> = (props) => {
  const { score, type, color, text } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [PillDetails, setPillDetails] = useState<PillDetail>({
    bgColor: '',
    review: '',
    reviewColor: '',
    noScore: false,
  });

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

  useEffect(() => {
    if (type !== 'sidebar') return;
    setLoading(true);
    let currentNoteDetails: PillDetail;
    currentNoteDetails = {
      bgColor: color,
      review: text,
    };
    if (currentNoteDetails) {
      setPillDetails(currentNoteDetails);
      setLoading(false);
    }
    setLoading(false);

    return () => {
      setPillDetails(null);
      setLoading(false);
    };
  }, [type]);

  return (
    !loading && (
      <div
        className={`w-max m-0.5 ${
          PillDetails.noScore ? 'py-px px-2' : 'py-1 px-4'
        }  rounded-3xl ${PillDetails.bgColor}`}>
        <p
          className={`w-full font-title text-xs lg:text-sm text-center text-gray-800 text-opacity-100`}>
          {PillDetails.review}
        </p>
      </div>
    )
  );
};

export default ScorePill;
