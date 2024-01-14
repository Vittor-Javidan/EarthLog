import { RegexRules } from '@V2/Types/AppTypes';

export default class RegexService {

  static rule: RegexRules = {
    'noSpaces':        /\s/,
    'noSpecialLetter': /^[a-zA-Z0-9]+$/,
    'id':              /^[0-9A-Za-z-]+$/,
    'fileName':        /^[a-zA-Z0-9_-]+$/,
    'hexColor':        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  };
}
