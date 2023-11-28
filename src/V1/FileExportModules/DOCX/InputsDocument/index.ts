import { Paragraph } from 'docx';

import { ConfigDTO } from '@V1/Types/AppTypes';
import { InputData } from '@V1/Types/ProjectTypes';

import { InputDocument_String } from './String';
import { InputDocument_Boolean } from './Boolean';
import { InputDocument_Options } from './Options';
import { InputDocument_Selection } from './Selection';
import { InputDocument_GPS } from './GPS';
import { InputDocument_Picture } from './Picture';

export async function document_inputData(o: {
  config: ConfigDTO
  inputData: InputData
}): Promise<Paragraph[]> {

  const { inputData } = o;

  switch (inputData.type) {
    case 'string':    return InputDocument_String({    ...o, inputData });
    case 'boolean':   return InputDocument_Boolean({   ...o, inputData });
    case 'options':   return InputDocument_Options({   ...o, inputData });
    case 'selection': return InputDocument_Selection({ ...o, inputData });
    case 'gps':       return InputDocument_GPS({       ...o, inputData });
    case 'picture':   return InputDocument_Picture({   ...o, inputData });
  }
}
