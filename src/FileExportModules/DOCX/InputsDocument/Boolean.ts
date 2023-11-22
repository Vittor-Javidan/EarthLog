import { Paragraph, TextRun } from 'docx';

import { ConfigDTO } from '@Types/AppTypes';
import { BooleanInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';

export function InputDocument_Boolean(o: {
  config: ConfigDTO
  inputData: BooleanInputData
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

  document.push(
    new Paragraph({
      children: [
        new TextRun({
          color: '#000000',
          font: 'Calibri',
          size: `${12}pt`,
          children: [
            o.inputData.notApplicable === true ? R['Not applicable'] : String(o.inputData.value),
          ],
        }),
      ],
    })
  );

  return document;
}
