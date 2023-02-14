export const getLocalStorageData = name => {
  const parsedData = JSON.parse(window.localStorage.getItem(name));
  if (parsedData) {
    return parsedData;
  } else {
    return [];
  }
};
