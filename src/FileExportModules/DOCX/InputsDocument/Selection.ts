import { Paragraph, TextRun } from 'docx';

import { ConfigDTO } from '@Types/AppTypes';
import { SelectionInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';

export function InputDocument_Selection(o: {
  config: ConfigDTO
  inputData: SelectionInputData
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

  let nothingSelected = true;
  for (let i = 0; i < o.inputData.value.options.length; i++) {
    if (o.inputData.value.options[i].id === o.inputData.value.id_selected) {
      nothingSelected = false;
      document.push(
        new Paragraph({
          children: [
            new TextRun({
              color: '#000000',
              font: 'Calibri',
              size: `${12}pt`,
              children: [o.inputData.value.options[i].optionLabel],
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
