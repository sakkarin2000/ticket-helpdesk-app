export const formatDate = (toFormat: Date) => {
  const formatted =
    toFormat.getFullYear() +
    "-" +
    (toFormat.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    toFormat.getDate().toString().padStart(2, "0") +
    " " +
    toFormat.getHours().toString().padStart(2, "0") +
    ":" +
    toFormat.getMinutes().toString().padStart(2, "0") +
    ":" +
    toFormat.getSeconds().toString().padStart(2, "0");
  return formatted;
};
