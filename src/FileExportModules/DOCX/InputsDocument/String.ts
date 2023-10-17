import { Paragraph, TextRun } from 'docx';
import { StringInputData } from '@Types/ProjectTypes';

export function InputDocument_String(inputData: StringInputData) {

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
            children: [ 'Empty' ],
          }),
        ],
      })
    );
  }

  return document;
}
