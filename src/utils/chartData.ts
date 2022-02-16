const selectKey = (type: string) => {
  switch (type) {
  case 'deaths':
    return 'new_deaths';
  case 'cases':
    return 'new_cases';
  case 'total deaths':
    return 'total_deaths';
  default:
    return 'total_cases';
  }
};

export const getChartData = (data: Array<any>, type: string) => {
  return data.map((value) => {
    return {
      date: value.date,
      [type]: value[selectKey(type)],
    };
  });
};

export const upperCase = (text: string) => {
  return text.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
};
