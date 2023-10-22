import { Paragraph, TextRun } from 'docx';

import { SelectionInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export function InputDocument_Selection(inputData: SelectionInputData) {

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

  let nothingSelected = true;
  for (let i = 0; i < inputData.value.options.length; i++) {
    if (inputData.value.options[i].id === inputData.value.id_selected) {
      nothingSelected = false;
      document.push(
        new Paragraph({
          children: [
            new TextRun({
              color: '#000000',
              font: 'Calibri',
              size: `${12}pt`,
              children: [inputData.value.options[i].optionLabel],
            }),
          ],
        })
      );
    }
  }

  if (nothingSelected) {
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
