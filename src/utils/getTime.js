const getTime = () => {
  const date = new Date();
  return `${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)}`;
};

export default getTime;
