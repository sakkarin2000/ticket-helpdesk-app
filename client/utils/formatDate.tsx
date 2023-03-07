export const formatDate = (toFormat: Date) => {
  const formatted =
    toFormat.getFullYear() +
    "-" +
    (toFormat.getMonth() + 1) +
    "-" +
    toFormat.getDate() +
    " " +
    toFormat.getHours() +
    ":" +
    toFormat.getMinutes() +
    ":" +
    toFormat.getMilliseconds().toString().substring(0, 2);
  return formatted;
};
