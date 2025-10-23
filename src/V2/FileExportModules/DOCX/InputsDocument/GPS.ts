import { Docx } from '../Docx';

import { ConfigDTO } from '@V2/Types/AppTypes';
import { GPSInputData } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';

export function InputDocument_GPS(o: {
  config: ConfigDTO
  inputData: GPSInputData
}): string[] {

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
    ])
  );

  if (inputData.value.altitude === undefined && inputData.value.coordinates === undefined) {
    document.push(
      Docx.paragraph([
        Docx.text({
          text: R['Empty'],
          fontSize: 12,
          color: 'FF0000',
        })
      ])
    );
  }

  if (inputData.value.coordinates !== undefined) {
    document.push(
      Docx.paragraph([
        Docx.text({
          text: `${R['Latitude:']} ${inputData.value.coordinates.lat} (${inputData.value.coordinates.accuracy}m)`,
          fontSize: 12,
          color: '000000',
        })
      ]),
      Docx.paragraph([
        Docx.text({
          text: `${R['Longitude:']} ${inputData.value.coordinates.long} (${inputData.value.coordinates.accuracy}m)`,
          fontSize: 12,
          color: '000000',
        })
      ])
    );
  }

  if (inputData.value.altitude !== undefined) {
    document.push(
      Docx.paragraph([
        Docx.text({
          text: `${R['Altitude:']} ${inputData.value.altitude.value} (${inputData.value.altitude.accuracy}m)`,
          fontSize: 12,
          color: '000000',
        })
      ])
    );
  }

  return document;
}
