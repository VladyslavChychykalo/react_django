export const date_formatter = (date: string) => {
  const dateObj = new Date(date);
  return (
    dateObj.getFullYear() +
    "-" +
    ("0" + (dateObj.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + dateObj.getDate()).slice(-2)
  );
};
