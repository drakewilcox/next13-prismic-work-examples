export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = new Date(
    date.toLocaleString("en-US", { timeZone: userTimeZone })
  );

  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "US/Mountain",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    localDate
  );

  return formattedDate.replace(/,/g, "");
};
