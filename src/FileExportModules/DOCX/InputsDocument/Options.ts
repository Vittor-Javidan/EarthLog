import { Paragraph, TextRun } from 'docx';

import { OptionsInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export function InputDocument_Options(inputData: OptionsInputData) {

  const R = translations.FileExportModules.docx[ConfigService.config.language];
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
          children: [ inputData.label ],
        }),
      ],
    })
  );

  let amountPrinted = 0;
  for (let i = 0; i < inputData.value.length; i++) {
    if (inputData.value[i].checked === true) {
      amountPrinted++;
      document.push(
        new Paragraph({
          children: [
            new TextRun({
              color: '#000000',
              font: 'Calibri',
              size: `${12}pt`,
              children: [inputData.value[i].optionLabel],
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
