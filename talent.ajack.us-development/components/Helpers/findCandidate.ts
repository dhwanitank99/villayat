import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_KEY, BASE_ID } = publicRuntimeConfig;

const Airtable = require('airtable');

const base = new Airtable({
  apiKey: API_KEY,
}).base(BASE_ID);

const findCandidate = async (recordID: string) => {
  let isPresent: boolean;

  try {
    await base('Applicants')
      .find(recordID)
      .then((res: {}) => {
        if (res['id']) {
          isPresent = true;
        } else {
          isPresent = false;
        }
      });
  } catch (e) {
    isPresent = false;
  }

  return isPresent;
};

export default findCandidate;
