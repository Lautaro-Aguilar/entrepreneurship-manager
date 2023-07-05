function padZero(value: any) {
  return value.toString().padStart(2, '0');
}

export default function transformDate(date: string | Date) {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = padZero(dateObj.getMonth() + 1);
  const day = padZero(dateObj.getDate());
  const hours = padZero(dateObj.getHours());
  const minutes = padZero(dateObj.getMinutes());

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate
}