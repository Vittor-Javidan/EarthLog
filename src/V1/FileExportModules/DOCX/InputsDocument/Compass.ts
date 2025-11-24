import {
  ConfigDTO,
  CompassInputData
} from "@V1/Types"

import { translations } from "@V1/Translations/index";
import { Docx } from "../Docx";

export function InputDocument_Compass(o: {
  config: ConfigDTO
  inputData: CompassInputData
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

    if (inputData.value[i].label !== '') {
      document.push(
        Docx.paragraph([
          Docx.text({
            text: `${inputData.value[i].heading} / ${inputData.value[i].dip}°`,
            fontSize: 12,
            color: '000000',
          }),
          Docx.text({
            text: ` - ${inputData.value[i].label}`,
            fontSize: 12,
            color: '000000',
          }),
        ])
      );
    } else {
      document.push(
        Docx.paragraph([
          Docx.text({
            text: `${inputData.value[i].heading} / ${inputData.value[i].dip}°`,
            fontSize: 12,
            color: '000000',
          }),
        ])
      );
    }

    amountPrinted++;
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