import { Docx } from '../Docx';

import { ConfigDTO } from '@V2/Types/AppTypes';
import { OptionsInputData } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';

export function InputDocument_Options(o: {
  config: ConfigDTO
  inputData: OptionsInputData
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

  let amountPrinted = 0;
  for (let i = 0; i < inputData.value.length; i++) {
    if (inputData.value[i].checked === true) {
      amountPrinted++;
      document.push(
        Docx.paragraph([
          Docx.text({
            text: inputData.value[i].optionLabel,
            fontSize: 12,
            color: '000000',
          })
        ])
      );
    }
  }

  if (amountPrinted <= 0) {
    document.push(
      Docx.paragraph([
        Docx.text({
          text: R['Empty'],
          fontSize: 12,
          color: 'FF0000',
        })
      ]),
    );
  }

  return document;
}
