interface Stage {
  id: string;
  name: string;
  notes: string;
  order: number;
  stages: string[];
  completion: string;
}

const getCandidateProgress = (arr: Stage[], val: string) => {
  if (val.length === 0) return;
  let test = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === val || arr[i].stages.includes(val)) {
      test.push({
        ...arr[i],
        completion: 'partial',
      });
      break;
    } else {
      test.push({
        ...arr[i],
        completion: 'complete',
      });
    }
  }
  const filtered = arr.filter((item, index) => item.id !== test[index]?.id);

  return {
    candidateProgress: [...test, ...filtered],
    status: test[test.length - 1].order,
  };
};

export default getCandidateProgress;
