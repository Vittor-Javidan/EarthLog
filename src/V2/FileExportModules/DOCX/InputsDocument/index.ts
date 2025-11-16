import { ConfigDTO } from '@V2/Types/AppTypes';
import { InputData } from '@V2/Types/ProjectTypes';

import { InputDocument_String } from './String';
import { InputDocument_Compass } from './Compass';
import { InputDocument_Boolean } from './Boolean';
import { InputDocument_Options } from './Options';
import { InputDocument_Selection } from './Selection';
import { InputDocument_GPS } from './GPS';
import { InputDocument_Picture } from './Picture';

export async function document_inputData(o: {
  config: ConfigDTO
  inputData: InputData
}): Promise<string[]> {

  const { config, inputData } = o;

  switch (inputData.type) {
    case 'string':    return InputDocument_String({ config, inputData });
    case 'boolean':   return InputDocument_Boolean({ config, inputData });
    case 'compass':   return InputDocument_Compass({ config, inputData });
    case 'options':   return InputDocument_Options({ config, inputData });
    case 'selection': return InputDocument_Selection({ config, inputData });
    case 'gps':       return InputDocument_GPS({ config, inputData });
    case 'picture':   return await InputDocument_Picture({ config, inputData });
  }
}
