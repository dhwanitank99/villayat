import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Description from '@description/Description';
import TableComponent from './TableComponent';
import Spinner from './Common/Spinner';
import DarkModeToggle from './DarkModeToggle';
import Footer from './Footer';
import QuizComponent from '@/components/QuizComponent';

interface MainProps {
  applicant: {}[];
  assignmentLogs: {}[];
  interviewLogs: {}[];
  quizResults: {
    quizName: string;
    quizQA: {
      q: string;
      a: string;
    }[];
    start: string;
    end: string;
    diff: {};
  };
}

const MainComponent: React.FC<MainProps> = (props) => {
  const { applicant, assignmentLogs, interviewLogs, quizResults } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (applicant && assignmentLogs && interviewLogs && quizResults) {
      setLoading(false);
    }
    return () => {
      setLoading(false);
    };
  }, [applicant, assignmentLogs, interviewLogs, quizResults]);

  return (
    <div className='w-screen lg:w-auto lg:max-w-full min-h-screen box-border bg-gray-50 dark:bg-gray-500 grid md:grid-cols-1 lg:grid-cols-4 grid-flow-row lg:gap-5 auto-rows-max overflow-x-hidden transition-colors'>
      <div className='w-screen lg:w-full col-span-1 lg:col-span-4'>
        <Header applicantID={applicant[`Applicant ID`]} />
      </div>
      <div className='w-screen p-4 lg:w-full lg:mx-4 col-span-1'>
        {!loading ? <Sidebar applicant={applicant} /> : <Spinner />}
      </div>
      <div className='w-screen lg:w-full p-4 col-span-1 lg:col-span-3'>
        <Description applicant={applicant} />
        {!loading ? <QuizComponent quizData={quizResults} /> : <Spinner />}
        {!loading ? (
          <TableComponent
            name={'Assignment Reviews'}
            content={assignmentLogs}
          />
        ) : (
          <Spinner />
        )}
        {!loading ? (
          <TableComponent name={'Interview Reports'} content={interviewLogs} />
        ) : (
          <Spinner />
        )}
      </div>
      <div className='w-screen lg:w-full col-span-1 lg:col-span-4 border-t border-gray-200'>
        <Footer />
      </div>
    </div>
  );
};

export default MainComponent;
