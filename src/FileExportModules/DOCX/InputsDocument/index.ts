import { InputData } from '@Types/ProjectTypes';
import { InputDocument_String } from './String';
import { InputDocument_Boolean } from './Boolean';
import { InputDocument_GPS } from './GPS';

export function document_inputData(inputData: InputData) {
  switch (inputData.type) {
    case 'string':  return InputDocument_String(inputData);
    case 'boolean': return InputDocument_Boolean(inputData);
    case 'gps':     return InputDocument_GPS(inputData);
  }
}
