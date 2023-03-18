export const fetchData = async (url) => {
  const response = await fetch(url);

  const data = await response.json();
  return data;
};

export const timeStampConverter = (timeStamp) => {
  return new Date(timeStamp).toLocaleString().replace(",", "");
};