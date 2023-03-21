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

export const onHandleReadStatusLocalStoreage = ({ nameString, data }) => {
  let prvData = getLocalStorage(nameString);
  let checkExis = prvData?.includes(data);

  !checkExis && prvData?.length >= 0 ? prvData.push(data) : (prvData = [data]);
  !checkExis &&
    setToLocalStorage({
      nameString: nameString,
      data: prvData,
    });
};

export const handleFilter = ({ key, data }) => {
  switch (key) {
    case "All":
      return data;
    case "Favorites":
      let favList = data?.filter((f) => f.favList === "favorite");
      return favList;
    case "Unread":
      let unRead = data?.filter((f) => f.status === "unRead");
      return unRead;
    case "Read":
      let read = data?.filter((f) => f.status === "read");
      return read;
    default:
      break;
  }
};
