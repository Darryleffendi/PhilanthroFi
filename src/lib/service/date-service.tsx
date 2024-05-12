export function convertToDate(date: number | BigInt, format: string) {
  const number = Number(date) / 1_000_000;
  const dateObj = new Date(number);

  switch (format) {
    case "date":
      return dateObj.toDateString();
    case "time":
      return dateObj.toTimeString();
    case "year":
      return dateObj.getFullYear().toString();
    case "month":
      return dateObj.getMonth().toString();
    case "day":
      return dateObj.getDate().toString();
    default:
      return dateObj.toLocaleString();
  }
}


export function convertDateToBigInt(date: Date): BigInt {
  const millisecondsSinceEpoch = date.getTime();
  const bigintValue = BigInt(millisecondsSinceEpoch * 1_000_000);
  return bigintValue;
}