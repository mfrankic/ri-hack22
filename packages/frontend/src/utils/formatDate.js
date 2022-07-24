const formatDate = (date) => {
  const newDate = new Date(date).toLocaleString('hr-HR');
  return newDate;
};

export default formatDate;
