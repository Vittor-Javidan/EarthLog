import { Paragraph, TextRun } from 'docx';

import { ConfigDTO } from '@V1/Types/AppTypes';
import { GPSInputData } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';

export function InputDocument_GPS(o: {
  config: ConfigDTO
  inputData: GPSInputData
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

  if (o.inputData.value.altitude === undefined && o.inputData.value.coordinates === undefined) {
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

  if (o.inputData.value.coordinates !== undefined) {
    document.push(
      new Paragraph({
        children: [
          new TextRun({
            color: '#000000',
            font: 'Calibri',
            size: `${12}pt`,
            children: [
              R['Latitude:'], ' ',
              String(o.inputData.value.coordinates.lat), ' ',
              `(${String(o.inputData.value.coordinates.accuracy)}m)`,
            ],
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
              R['Longitude:'], ' ',
              String(o.inputData.value.coordinates.long), ' ',
              `(${String(o.inputData.value.coordinates.accuracy)}m)`,
            ],
          }),
        ],
      })
    );
  }

  if (o.inputData.value.altitude !== undefined) {
    document.push(
      new Paragraph({
        children: [
          new TextRun({
            color: '#000000',
            font: 'Calibri',
            size: `${12}pt`,
            children: [
              R['Altitude:'], ' ',
              String(o.inputData.value.altitude.value), ' ',
              `(${String(o.inputData.value.altitude.accuracy)}m)`,
            ],
          }),
        ],
      })
    );
  }

  return document;
}
