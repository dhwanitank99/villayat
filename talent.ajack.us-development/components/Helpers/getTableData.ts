import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { API_KEY, BASE_ID, recordID } = publicRuntimeConfig;

const getTableData = (fields: {}[]) => {
  let tableArray = [];
  let evaluationObject: {
    evaluatedOn: string;
    score: string | number | boolean;
  } = {
    evaluatedOn: '',
    score: '',
  };

  let tableObject: {
    evaluation: object[];
    notes: string;
    nextStage: boolean;
    candidate: string;
    reviewer: string;
    createdOn: string;
  } = {
    evaluation: [],
    notes: '',
    nextStage: false,
    candidate: '',
    reviewer: '',
    createdOn: '',
  };

  let currentScore: string | number | boolean = '';
  let currentReview: string | boolean;
  let notesField = '';
  let excludeKeys = ['Created At', 'Notes', 'Key', 'Go to next stage'];
  let isGoingToNextStage: boolean;
  let names: string[] = [];
  let createdAt = '';

  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      const excludeStrings = [
        'Candidate Name',
        'Candidate',
        'Reviewer',
        'Reviewer Name',
        recordID,
        'Applying for',
      ];
      if (excludeStrings.includes(key)) continue;
      currentReview = fields[key] as string | boolean;

      if (typeof currentReview === 'string' && !excludeKeys.includes(key)) {
        currentScore = +currentReview.match(/\d/g)?.[0];
      }
      if (!excludeKeys.includes(key)) {
        evaluationObject = {
          evaluatedOn: key,
          score: currentScore,
        };
      } else {
        evaluationObject = {
          evaluatedOn: '',
          score: '',
        };
      }

      if (typeof currentReview === 'string' && key === 'Notes') {
        notesField = currentReview;
      }
      if (typeof currentReview === 'boolean' && key === 'Go to next stage') {
        isGoingToNextStage = currentReview;
      }
      if (typeof currentReview === 'string' && key === 'Key') {
        names = currentReview.split('-');
      }
      if (typeof currentReview === 'string' && key === 'Created At') {
        createdAt = currentReview;
      }

      tableObject = {
        evaluation:
          evaluationObject.evaluatedOn !== '' && evaluationObject.score !== ''
            ? [...tableObject.evaluation, evaluationObject]
            : [...tableObject.evaluation],
        notes: notesField,
        nextStage: isGoingToNextStage,
        candidate: names[0],
        reviewer: names[1],
        createdOn: createdAt,
      };
    }
  }
  tableArray.push(tableObject);

  return tableArray;
};

export default getTableData;
