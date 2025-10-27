import { Docx } from '../Docx';

import { ConfigDTO } from '@V1/Types/AppTypes';
import { ProjectDTO } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';

import { document_ProjectWidgets } from '../ProjectWidgetsDocument';
import { document_AllSamples } from '../AllSamplesDocument';

/**
 * @WARNING Requires `Docx.setImageFilePath` to be called first due to Image on `InputDocument_Picture` file reading
 * @WARNING Requires `Docx.listImageFiles` to be called first due to Image on `InputDocument_Picture` file reading
 */
export async function document_Project(o: {
  config: ConfigDTO,
  projectDTO: ProjectDTO,
}): Promise<string[]> {

  const { config, projectDTO } = o;
  const R = translations.FileExportModules.docx[config.language];
  const document: string[] = [];

  // DOCUMENT TITLE
  document.push(
    Docx.paragraph([
      Docx.text({
        text:  projectDTO.projectSettings.name,
        fontSize: 18,
        color: '000000',
        bold: true,
      })
    ])
  );

  // 1 - PROJECT INFO ========
  document.push(
    Docx.paragraph([]),
    Docx.paragraph([]),
    Docx.paragraph([
      Docx.text({
        text: `1. ${R['Project info']}`,
        fontSize: 16,
        color: '000000',
        bold: true,
      })
    ]),
    ...await document_ProjectWidgets(o),
  )

  // 2 - SAMPLES =============
  const sampleAlias_Plural = projectDTO.projectSettings.sampleAlias.plural;
  const sampleAliasToDisplay = sampleAlias_Plural !== '' ? sampleAlias_Plural : R['Samples'];

  document.push(
    Docx.paragraph([]),
    Docx.paragraph([
      Docx.text({
        text: `2. ${sampleAliasToDisplay}`,
        fontSize: 16,
        color: '000000',
        bold: true,
      })
    ]),
    ...await document_AllSamples(o),
  )

  return document;
}
