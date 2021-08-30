import getTableData from './getTableData';

export const getCleanData = (content: any[]) => {
  let cleanedData = [];
  let parameterKeys = [];
  let parameterObjects = [];
  if (content) {
    let currentData;
    content.map((candidate) => {
      const { fields } = candidate;
      if (fields.length === 0) return;
      currentData = getTableData(fields)?.[0];
      cleanedData.push(currentData);
    });
    if (cleanedData) {
      cleanedData.map((data) =>
        data.evaluation.map(
          (parameter) =>
            !parameterKeys.includes(parameter.evaluatedOn) &&
            parameterKeys.push(parameter.evaluatedOn)
        )
      );

      parameterKeys.sort();

      cleanedData.map((data, index) => {
        let parameters = [];
        parameterKeys.map((key) => {
          parameters[key] = null;
          data.evaluation.map((parameter) => {
            parameter.evaluatedOn === key &&
              (parameters[key] = parameter.score);
          });
        });

        parameterObjects[index] = parameters;
      });
    }
  }

  return { parameterKeys, parameterObjects, cleanedData };
};
