module.exports = {
  publicRuntimeConfig: {
    API_KEY: process.env.AIRTABLE_API_KEY,
    BASE_ID: process.env.AIRTABLE_BASE_ID,
    order: process.env.AIRTABLE_APPLICATION_STATUS_ORDER_COLUMN_NAME,
    recordID: process.env.AIRTABLE_APPLICANT_RECORD_ID_COLUMN_NAME,
  },

  images: {
    domains: ['dl.airtable.com'],
  },
  webpack5: false
};
