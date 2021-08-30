export const getPillDetails = (score: number, text?: string) => {
  switch (score) {
    case 1:
      return {
        bgColor: 'bg-gray-200',
        review: text ? text : `${score} - Poor`,
        reviewColor: 'text-red-400',
        noScore: false,
      };
    case 2:
      return {
        bgColor: 'bg-red-200',
        review: text ? text : `${score} - Average`,
        reviewColor: 'text-red-600',
        noScore: false,
      };
    case 3:
      return {
        bgColor: 'bg-yellow-100',
        review: text ? text : `${score} - Good`,
        reviewColor: 'text-yellow-600',
        noScore: false,
      };
    case 4:
      return {
        bgColor: 'bg-green-200',
        review: text ? text : `${score} - Excellent`,
        reviewColor: 'text-green-600',
        noScore: false,
      };

    default:
      return {
        bgColor: 'bg-gray-500',
        review: '',
        noScore: true,
      };
  }
};
