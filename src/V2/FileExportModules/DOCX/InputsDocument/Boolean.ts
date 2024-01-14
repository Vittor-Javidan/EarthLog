import { Paragraph, TextRun } from 'docx';

import { ConfigDTO } from '@V2/Types/AppTypes';
import { BooleanInputData } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';

export function InputDocument_Boolean(o: {
  config: ConfigDTO
  inputData: BooleanInputData
}) {

  const { config, inputData } = o;
  const R = translations.FileExportModules.docx[config.language];
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
