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

  const { config, inputData } = o;

  switch (inputData.type) {
    case 'string':    return InputDocument_String({ config, inputData });
    case 'boolean':   return InputDocument_Boolean({ config, inputData });
    case 'options':   return InputDocument_Options({ config, inputData });
    case 'selection': return InputDocument_Selection({ config, inputData });
    case 'gps':       return InputDocument_GPS({ config, inputData });
    case 'picture':   return InputDocument_Picture({ config, inputData });
  }
}
