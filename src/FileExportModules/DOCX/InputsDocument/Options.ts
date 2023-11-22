import { Paragraph, TextRun } from 'docx';

import { ConfigDTO } from '@Types/AppTypes';
import { OptionsInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';

export function InputDocument_Options(o: {
  config: ConfigDTO
  inputData: OptionsInputData
}) {

  const R = translations.FileExportModules.docx[o.config.language];
  const document: Paragraph[] = [];

  document.push(
    new Paragraph({
      children: [
        new TextRun({
          bold: true,
          italics: true,
          color: '#000000',
          font: 'Calibri',
          size: `${12}pt`,
          children: [ o.inputData.label ],
        }),
      ],
    })
  );

  let amountPrinted = 0;
  for (let i = 0; i < o.inputData.value.length; i++) {
    if (o.inputData.value[i].checked === true) {
      amountPrinted++;
      document.push(
        new Paragraph({
          children: [
            new TextRun({
              color: '#000000',
              font: 'Calibri',
              size: `${12}pt`,
              children: [o.inputData.value[i].optionLabel],
            }),
          ],
        })
      );
    }
  }

  if (amountPrinted <= 0) {
    document.push(
      new Paragraph({
        children: [
          new TextRun({
            color: '#FF0000',
            font: 'Calibri',
            size: `${12}pt`,
            children: [ R['Empty'] ],
          }),
        ],
      })
    );
  }

  return document;
}
