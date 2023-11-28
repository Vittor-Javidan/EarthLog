import { Paragraph, TextRun } from 'docx';

import { ConfigDTO } from '@V1/Types/AppTypes';
import { PictureInputData } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';

export async function InputDocument_Picture(o: {
  config: ConfigDTO
  inputData: PictureInputData
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

  for (let i = 0; i < o.inputData.value.length; i++) {

    const { id_picture, description, dateAndTime } = o.inputData.value[i];
    const pictureNumber = ` ${i + 1}`;
    const isLast = i === o.inputData.value.length - 1;
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
