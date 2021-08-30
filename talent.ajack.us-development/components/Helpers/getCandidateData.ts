import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_KEY, BASE_ID, recordID } = publicRuntimeConfig;

const Airtable = require('airtable');

const base = new Airtable({
  apiKey: API_KEY,
}).base(BASE_ID);

const getCandidateData = async (content: string[], name: string) => {
  let fields: any[];
  let formula = ['OR(', ')'];

  content.map((link, index) => {
    formula.splice(
      1 + index,
      0,
      `${index > 0 ? ',' : ''}{${recordID}} = '${link}'`
    );
  });

  try {
    fields = await base(name)
      .select({
        filterByFormula: `${formula.join('')}`,
      })
      .firstPage();
  } catch (error) {
    console.error(error);
  }
  return fields;
};

export default getCandidateData;
