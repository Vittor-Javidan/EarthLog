import { Paragraph, TextRun } from 'docx';

import { GPSInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export function InputDocument_GPS(inputData: GPSInputData) {

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

  if (inputData.value.altitude === undefined && inputData.value.coordinates === undefined) {
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

  if (inputData.value.coordinates !== undefined) {
    document.push(
      new Paragraph({
        children: [
          new TextRun({
            color: '#000000',
            font: 'Calibri',
            size: `${12}pt`,
            children: [
              R['Latitude:'], ' ',
              String(inputData.value.coordinates.lat), ' ',
              `(${String(inputData.value.coordinates.accuracy)}m)`,
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
              String(inputData.value.coordinates.long), ' ',
              `(${String(inputData.value.coordinates.accuracy)}m)`,
            ],
          }),
        ],
      })
    );
  }

  if (inputData.value.altitude !== undefined) {
    document.push(
      new Paragraph({
        children: [
          new TextRun({
            color: '#000000',
            font: 'Calibri',
            size: `${12}pt`,
            children: [
              R['Altitude:'], ' ',
              String(inputData.value.altitude.value), ' ',
              `(${String(inputData.value.altitude.accuracy)}m)`,
            ],
          }),
        ],
      })
    );
  }

  return document;
}
