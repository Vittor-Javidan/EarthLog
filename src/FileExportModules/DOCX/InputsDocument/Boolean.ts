import { Paragraph, TextRun } from 'docx';

import { BooleanInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export function InputDocument_Boolean(inputData: BooleanInputData) {

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

  document.push(
    new Paragraph({
      children: [
        new TextRun({
          color: '#000000',
          font: 'Calibri',
          size: `${12}pt`,
          children: [
            inputData.notApplicable === true ? R['Not applicable'] : String(inputData.value),
          ],
        }),
      ],
    })
  );

  return document;
}
