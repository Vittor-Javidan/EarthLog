import { Docx } from '../Docx';

import { ConfigDTO } from '@V2/Types/AppTypes';
import { PictureInputData } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';

export async function InputDocument_Picture(o: {
  config: ConfigDTO
  inputData: PictureInputData
}): Promise<string[]> {

  const { config, inputData } = o;
  const R = translations.FileExportModules.docx[config.language];
  const document: string[] = [];

  document.push(
    Docx.paragraph([
      Docx.text({
        text: inputData.label,
        fontSize: 12,
        color: '000000',
        bold: true,
        italic: true,
      })
    ]),
  );

  for (let i = 0; i < inputData.value.length; i++) {

    const { id_picture, description, dateAndTime } = inputData.value[i];
    const pictureNumber = ` ${i + 1}`;
    const isLast = i === inputData.value.length - 1;
    const isDescriptionEmpty = description === '';

    document.push(
      Docx.paragraph([
        Docx.text({
          text: `${R['Picture']} ${pictureNumber} - ${id_picture} - ${dateAndTime}`,
          fontSize: 12,
          color: '000000',
        })
      ]),
      await Docx.image({ id_picture }),
      Docx.paragraph([
        Docx.text({
          text: `${R['Description']}: `,
          fontSize: 12,
          color: '000000',
        }),
        Docx.text({
          text: isDescriptionEmpty ? R['Empty'] : description,
          fontSize: 12,
          color: isDescriptionEmpty ? 'FF0000' : '000000',
        })
      ]),
    );

    if (!isLast) {
      document.push(
        Docx.paragraph([])
      );
    }
  }

  return document;
}
