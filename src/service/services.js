export const fetchData = async (url) => {
  const response = await fetch(url);

  const data = await response.json();
  return data;
};

export const timeStampConverter = (timeStamp) => {
  return new Date(timeStamp).toLocaleString().replace(",", "");
};
export const setToLocalStorage = ({ nameString, data }) => {
  localStorage.setItem(nameString, JSON.stringify(data));
};

export const getLocalStorage = (nameString) => {
  return JSON.parse(localStorage.getItem(nameString));
};

export const onHandleLocalStorage = ({ nameString, data }) => {
  let prvData = getLocalStorage(nameString);
  let checkExis = prvData?.includes(data);

  if (checkExis) {
    let removedFromList = prvData?.filter((f) => f !== data);
    setToLocalStorage({
      nameString: nameString,
      data: removedFromList,
    });
    return removedFromList;
  } else {
    prvData?.length >= 0 ? prvData.push(data) : (prvData = [data]);
    setToLocalStorage({
      nameString: nameString,
      data: prvData,
    });
    return prvData;
  }
};
