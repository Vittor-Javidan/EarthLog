import {
  RegexRules
} from '@V2/Types';

export class RegexService {

  static rule: RegexRules = {
    'noSpaces':        /\s/,
    'noSpecialLetter': /^[a-zA-Z0-9]+$/,
    'id':              /^[0-9A-Za-z-]+$/,
    'fileName':        /[^a-zA-Z0-9-_]/g,
    'hexColor':        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    'declination':     /^(?:-?(?:[0-9]{1,2}|[12][0-9]{2}|3[0-5][0-9]|360))(?:\.[0-9]{2})?$/,
    'measurementAvg':  /^[1-9][0-9]*$/,
    'heading':         /^(?:[0-9]{1,2}|[12][0-9]{2}|3[0-5][0-9]|360)(?:\.[0-9]{2})?$/,
    'dip':             /^(?:[0-9]|[1-8][0-9]|90)(?:\.[0-9]{2})?$/,
  };
}
