interface IParseDate {
  date: string | Date;
  locale?: string;
  formatOptions?: Intl.DateTimeFormatOptions;
}

const parseDate = ({ date, locale = "es-ES", formatOptions = {
  // weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  // hour: '2-digit',
  // minute: '2-digit',
  // second: '2-digit',
  hour12: false   
} }: IParseDate) => {
  if (!date) return date;

  const dateFormatter = new Intl.DateTimeFormat(locale, formatOptions );
  return dateFormatter.format(new Date(date));
};

export default parseDate;
