import { Docx } from '../Docx';

import { ConfigDTO } from '@V1/Types/AppTypes';
import { StringInputData } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';

export function InputDocument_String(o: {
  config: ConfigDTO
  inputData: StringInputData
}): string[] {

  const { config, inputData } = o;
  const R = translations.FileExportModules.docx[config.language];
  const document: string[] = [];

  document.push(
    Docx.paragraph([
      Docx.text({
        text: inputData.label,
        fontSize: 12,
        color: '000000',
        bold: true,
        italic: true,
      })
    ])
  );

  if (inputData.value !== '') {
    document.push(
      Docx.paragraph([
        Docx.text({
          text: inputData.value,
          fontSize: 12,
          color: '000000',
        })
      ])
    );
  } else {
    document.push(
      Docx.paragraph([
        Docx.text({
          text: R['Empty'],
          fontSize: 12,
          color: 'FF0000',
        })
      ])
    );
  }

  return document;
}
