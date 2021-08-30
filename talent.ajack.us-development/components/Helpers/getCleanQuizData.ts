const { DateTime } = require('luxon');

const getCleanQuizData = (quizData: {}) => {
  let quizName = quizData['Name (from Quiz)'][0] || '';
  let startTime = DateTime.fromISO(quizData['Start Time']).toLocaleString(
    DateTime.DATETIME_MED_WITH_SECONDS
  );
  let endTime = DateTime.fromISO(quizData['End Time']).toLocaleString(
    DateTime.DATETIME_MED_WITH_SECONDS
  );
  let timeDiff = DateTime.fromISO(quizData['End Time'])
    .diff(DateTime.fromISO(quizData['Start Time']), ['minutes', 'seconds'])
    .toObject();
  let quizQA = [];
  let quizDataKeys = Object.keys(quizData)
    .sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    })
    .filter((key) => /Q\d+/.test(key));

  for (let i = 0, len = quizDataKeys.length; i < len; i++) {
    let answerIndex = i + 1;
    if (quizDataKeys[i].includes('A')) continue;
    quizQA.push({
      q: quizData[quizDataKeys[i]],
      a: quizData[
        quizDataKeys[answerIndex < quizDataKeys.length ? answerIndex : i]
      ],
    });
  }

  return {
    quizName,
    quizQA,
    data: quizData,
    start: startTime,
    end: endTime,
    diff: timeDiff,
  };
};

export default getCleanQuizData;
