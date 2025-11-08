import { Docx } from '../Docx'
 
import { ConfigDTO } from '@V1/Types/AppTypes';
import { BooleanInputData } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';

export function InputDocument_Boolean(o: {
  config: ConfigDTO
  inputData: BooleanInputData
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
    ]),
    Docx.paragraph([
      Docx.text({
        text: inputData.notApplicable === true ? R['Not applicable'] : String(inputData.value),
        fontSize: 12,
        color: '000000',
      })
    ]),
  );

  return document;
}
