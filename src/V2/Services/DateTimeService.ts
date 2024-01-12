import { DateFormat, LanguageTag, TimeFormat } from '@V2/Types/AppTypes';

export default class DateTimeService {

  static DateFormatByTag(languageTag: LanguageTag): DateFormat {
    const dateFormatByTag: Record<LanguageTag, DateFormat> = {
      'en-US': 'mm / dd / yyyy',
      'pt-BR': 'dd / mm / yyyy',
    };
    return dateFormatByTag[languageTag];
  }

  static TimeFormatByTag(languageTag: LanguageTag): TimeFormat {
    const timeFormatByTag: Record<LanguageTag, TimeFormat> = {
      'en-US': 'HH : MM',
      'pt-BR': 'HH : MM',
    };
    return timeFormatByTag[languageTag];
  }

  static getCurrentDateTimeUTC(): string  {
    const now     = new Date();
    const year    = now.getUTCFullYear();
    const month   = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day     = String(now.getUTCDate()).padStart(2, '0');
    const hours   = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} (UTC)`;
  }

  static getCurrentDateTime(options: {
    dateFormat: DateFormat,
    timeFormat: TimeFormat,
  }): string {
    const now     = new Date();
    const year    = now.getFullYear();
    const month   = String(now.getMonth() + 1).padStart(2, '0');
    const day     = String(now.getDate()).padStart(2, '0');
    const hours   = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return this.formatDateAndTime({
      dateFormat: options.dateFormat,
      timeFormat: options.timeFormat,
      year:       year,
      month:      month,
      day:        day,
      hour:       hours,
      minute:     minutes,
      seconds:    seconds,
    });
  }

  private static formatDateAndTime(options: {
    dateFormat: DateFormat,
    timeFormat: TimeFormat,
    year: string | number,
    month: string | number,
    day: string | number,
    hour: string | number,
    minute: string | number,
    seconds: string | number,
  }): string {

    const { year, month, day, hour, minute, seconds } = options;

    const dateFormats: Record<DateFormat, string> = {
      'yyyy / mm / dd': `${year}/${month}/${day}`,
      'yyyy / dd / mm': `${year}/${day}/${month}`,
      'mm / yyyy / dd': `${month}/${year}/${day}`,
      'dd / yyyy / mm': `${day}/${year}/${month}`,
      'mm / dd / yyyy': `${month}/${day}/${year}`,
      'dd / mm / yyyy': `${day}/${month}/${year}`,
    };

    const timeFormats: Record<TimeFormat, string> = {
      'HH : MM : SS': `${hour}:${minute}:${seconds}`,
      'HH : SS : MM': `${hour}:${seconds}:${minute}`,
      'MM : HH : SS': `${minute}:${hour}:${seconds}`,
      'SS : HH : MM': `${seconds}:${hour}:${minute}`,
      'MM : SS : HH': `${minute}:${seconds}:${hour}`,
      'SS : MM : HH': `${seconds}:${minute}:${hour}`,
      'HH : MM':      `${hour}:${minute}`,
      'MM : HH':      `${minute}:${hour}`,
    };

    const formattedDate = dateFormats[options.dateFormat];
    const formattedTime = timeFormats[options.timeFormat];

    return `${formattedDate} - ${formattedTime}`;
  }
}
