import React from 'react';
import AssignmentNote from './AssignmentNote';
import Image from 'next/image';

const AssignmentReview = () => (
  <div className='assignment-rev mt-4 flex flex-col items-center'>
    <div className='assignment-header font-head text-4xl'>
      Assignment Review
    </div>
    <div className='m-4 w-full max-w-3xl p-4 bg-white shadow-lg'>
      <div className='title max-w-lg'>
        <p className='font-title font-semibold text-xl'>Apoorv Sohal</p>
        <p className='font-title font-light text-lg'>01/01/2021</p>
      </div>
      <div className='notes mt-4 w-full p-4 flex justify-evenly'>
        <span className='font-serif text-6xl'>"</span>{' '}
        <p className='font-title text-4xl italic'>Overall it's good!</p>
        <span className='font-serif text-6xl'>"</span>
      </div>
      <div className='body mt-4 p-4 flex flex-wrap justify-around'>
        <AssignmentNote
          score={4}
          evaluatedOn={`Naming Convention / Grammar / Spelling`}
        />
        <AssignmentNote score={4} evaluatedOn={`Don't Repeat Yourself (DRY)`} />
        <AssignmentNote score={3} evaluatedOn={`Formatting`} />
        <AssignmentNote score={1} evaluatedOn={`Code Comments`} />
        <AssignmentNote score={2} evaluatedOn={`Project File Structure`} />
        <AssignmentNote
          score={4}
          evaluatedOn={`Unit Testing / Test Coverage`}
        />
        <AssignmentNote
          score={4}
          evaluatedOn={`Validation & Exception Handling`}
        />
        <AssignmentNote score={4} evaluatedOn={`Commit History`} />
      </div>

      <div className='goto flex items-center justify-end'>
        <Image src='/goto-next-stage.svg' width={34} height={35} />
        <div className='text m-2'>Go to next stage</div>
      </div>
    </div>
  </div>
);

export default AssignmentReview;
