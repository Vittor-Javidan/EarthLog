import { Paragraph, TextRun } from 'docx';

import { ConfigDTO } from '@V1/Types/AppTypes';
import { StringInputData } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';

export function InputDocument_String(o: {
  config: ConfigDTO
  inputData: StringInputData
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

  if (inputData.value !== '') {
    document.push(
      new Paragraph({
        children: [
          new TextRun({
            color: '#000000',
            font: 'Calibri',
            size: `${12}pt`,
            children: [ inputData.value ],
          }),
        ],
      })
    );
  } else {
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
