import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Header from '@/components/Header';
import Timeline from '@/components/Timeline';
import getConfig from 'next/config';
import getCandidateProgress from '@/components/Helpers/getCandidateProgress';
import DarkModeToggle from '@/components/DarkModeToggle';
import Head from 'next/head';
import Footer from '@/components/Footer';

const { publicRuntimeConfig } = getConfig();
const { API_KEY, BASE_ID, order } = publicRuntimeConfig;

const Airtable = require('airtable');

const base = new Airtable({
  apiKey: API_KEY,
}).base(BASE_ID);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let applicant;
  let cleanedApplicationStatusTableData;
  try {
    applicant = await base('Applicants').find(ctx?.query?.recordID);
    const applicationStatusTableData = await base('Application Status')
      .select({})
      .firstPage();
    cleanedApplicationStatusTableData = applicationStatusTableData
      .map((record) => {
        return {
          id: record.id,
          name: record.fields.Name,
          notes: record.fields['Notes for Candidate'] || '',
          order: record.fields[order],
          stages: record.fields['Stages'] || [],
          completion: 'incomplete',
        };
      })
      .sort((a, b) => a.order - b.order);
    if (!applicant || !cleanedApplicationStatusTableData) {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stageData: cleanedApplicationStatusTableData,
      applicantStageID:
        applicant?.fields?.Stage?.[0] ||
        cleanedApplicationStatusTableData[0].id,
      applicantName: applicant?.fields?.['Full Name'],
    },
  };
};

const Progress = ({ stageData, applicantStageID, applicantName }) => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const { candidateProgress, status } = getCandidateProgress(
    stageData,
    applicantStageID
  );
  useEffect(() => {
    setCurrentStatus(parseInt(status));
  }, [status]);

  useEffect(() => {
    if (currentStatus > 2) {
      (() => {
        let s1 = document.createElement('script');
        let s0 = document.getElementsByTagName('script')[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/60b871e7de99a4282a1b1e41/1f787psoi';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })();
    }
  }, [currentStatus]);

  return (
    <>
      <Head>
        <title>Tacnique | Application</title>
      </Head>
      <div className='dark:bg-gray-700'>
        <Header />
        <h1 className='mx-auto mt-8 w-max text-lg max-w-xs lg:max-w-6xl md:text-2xl lg:text-4xl font-title dark:text-gray-100'>
          <span className='relative'>
            <span className='relative h-min text-black bg-line bg-yellow-200 dark:bg-green-500 dark:text-white hover:bg-green-500 dark:hover:bg-yellow-200 hover:text-white dark:hover:text-gray-800 transition-colors'>
              {applicantName || 'Candidate'}
            </span>
          </span>
          , here is your status in our{' '}
          <a
            target='_blank'
            href='https://airtable.com/shriLspCgsHxFrthE/tblL6AhAVhJAE9qkT'
            className='underline hover:text-cadet-blue transition-colors'>
            hiring process
          </a>
        </h1>
        <Timeline stageData={candidateProgress} />
        <DarkModeToggle />
        <div className='w-screen lg:w-full border-t border-gray-200'>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Progress;
