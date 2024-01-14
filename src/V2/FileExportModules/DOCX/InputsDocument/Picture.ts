import { Paragraph, TextRun } from 'docx';

import { ConfigDTO } from '@V2/Types/AppTypes';
import { PictureInputData } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';

export async function InputDocument_Picture(o: {
  config: ConfigDTO
  inputData: PictureInputData
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

  for (let i = 0; i < inputData.value.length; i++) {

    const { id_picture, description, dateAndTime } = inputData.value[i];
    const pictureNumber = ` ${i + 1}`;
    const isLast = i === inputData.value.length - 1;
    const isDescriptionEmpty = description === '';

    document.push(
      new Paragraph({
        children: [
          new TextRun({
            color: '#000000',
            font: 'Calibri',
            size: `${12}pt`,
            children: [ R['Picture'], pictureNumber, ' - ', id_picture, ' - ', dateAndTime ],
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
            children: [ R['Description'], ': '],
          }),
          new TextRun({
            color: isDescriptionEmpty ? '#FF0000' : '#000000',
            font: 'Calibri',
            size: `${12}pt`,
            children: [ isDescriptionEmpty ? R['Empty'] : description ],
          }),
        ],
      })
    );

    if (!isLast) {
      document.push(new Paragraph({ text: '' }));
    }
  }

  return document;
}
