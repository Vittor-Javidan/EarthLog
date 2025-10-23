import { Docx } from '../Docx';

import { ConfigDTO } from '@V2/Types/AppTypes';
import { SelectionInputData } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';

export function InputDocument_Selection(o: {
  config: ConfigDTO
  inputData: SelectionInputData
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

  let nothingSelected = true;
  for (let i = 0; i < inputData.value.options.length; i++) {
    if (inputData.value.options[i].id === inputData.value.id_selected) {
      nothingSelected = false;
      document.push(
        Docx.paragraph([
          Docx.text({
            text: inputData.value.options[i].optionLabel,
            fontSize: 12,
            color: '000000',
          })
        ])
      );
    }
  }

  if (nothingSelected) {
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
