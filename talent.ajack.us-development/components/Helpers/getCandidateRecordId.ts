import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_KEY, BASE_ID } = publicRuntimeConfig;

const Airtable = require('airtable');

const base = new Airtable({
  apiKey: 'API_KEY',
}).base(BASE_ID);

const getCandidateRecordId = async (currentId: number, type: string) => {
  let applicantId = null;
  let recordId = null;

  if (type === 'next') {
    applicantId = currentId + 1;
  } else if (type === 'previous') {
    applicantId = currentId - 1;
  }

  if (applicantId) {
    try {
      await base('Applicants')
        .select({
          filterByFormula: `{Applicant ID} = "${applicantId}"`,
        })
        .firstPage()
        .then((res: {}) => {
          recordId = res[0].id;
        });
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    return false;
  }

  return recordId;
};

export default getCandidateRecordId;
