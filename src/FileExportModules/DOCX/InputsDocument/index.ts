import { InputData } from '@Types/ProjectTypes';

import { InputDocument_String } from './String';
import { InputDocument_Boolean } from './Boolean';
import { InputDocument_GPS } from './GPS';
import { InputDocument_Options } from './Options';
import { Paragraph } from 'docx';
import { InputDocument_Selection } from './Selection';

export function document_inputData(inputData: InputData): Paragraph[] {
  switch (inputData.type) {
    case 'string':    return InputDocument_String(inputData);
    case 'boolean':   return InputDocument_Boolean(inputData);
    case 'options':   return InputDocument_Options(inputData);
    case 'selection': return InputDocument_Selection(inputData);
    case 'gps':       return InputDocument_GPS(inputData);
  }
}
