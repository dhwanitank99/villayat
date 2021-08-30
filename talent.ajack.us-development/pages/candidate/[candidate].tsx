import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import MainComponent from '@/components/MainComponent';

import getCandidateData from '@/components/Helpers/getCandidateData';
import getCleanQuizData from '@helpers/getCleanQuizData';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { API_KEY, BASE_ID } = publicRuntimeConfig;

const Airtable = require('airtable');

const base = new Airtable({
  apiKey: API_KEY,
}).base(BASE_ID);

export const getServerSideProps: GetServerSideProps = async (context) => {
  let applicant;
  let assignmentLogs;
  let interviewLogs;
  let quizResults;

  if (!context?.query?.reveal) {
    return {
      notFound: true,
    };
  }

  try {
    await base('Applicants')
      .find(context.query?.candidate)
      .then(async (res) => {
        applicant = res['fields'];

        try {
          if (applicant['Interview Logs']) {
            interviewLogs =
              (await getCandidateData(
                applicant['Interview Logs'],
                'Interview Log'
              )) || [];
            interviewLogs = JSON.parse(JSON.stringify(interviewLogs));
          } else {
            interviewLogs = [];
          }
        } catch (err1) {
          console.error(err1);
        }

        try {
          if (applicant['Assignment Review Logs']) {
            assignmentLogs =
              (await getCandidateData(
                applicant['Assignment Review Logs'],
                'Assignment Review Log'
              )) || [];
            assignmentLogs = JSON.parse(JSON.stringify(assignmentLogs));
          } else {
            assignmentLogs = [];
          }
        } catch (err2) {
          console.error(err2);
        }

        try {
          await base('Quiz Results')
            .select({
              filterByFormula: `{Email} = "${applicant['Email']}"`,
            })
            .firstPage()
            .then((res: {}) => {
              quizResults = getCleanQuizData(
                JSON.parse(JSON.stringify(res))?.[0]?.fields
              );
            });
        } catch (error) {
          console.error(error);
          return false;
        }
      });
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      applicant,
      assignmentLogs,
      interviewLogs,
      quizResults,
    },
  };
};

export default function Candidate({
  applicant,
  assignmentLogs,
  interviewLogs,
  quizResults,
}) {
  return (
    <>
      <Head>
        <title>Tacnique | Candidate</title>
      </Head>
      <MainComponent
        applicant={applicant}
        assignmentLogs={assignmentLogs}
        interviewLogs={interviewLogs}
        quizResults={quizResults}
      />
    </>
  );
}
