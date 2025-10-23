import { Docx } from '../Docx';

import { ConfigDTO } from '@V2/Types/AppTypes';
import { ProjectDTO } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';

import { document_ProjectWidgets } from '../ProjectWidgetsDocument';
import { document_AllSamples } from '../AllSamplesDocument';

export async function document_Project(o: {
  config: ConfigDTO,
  projectDTO: ProjectDTO,
  feedback: (message: string) => void
}): Promise<string[]> {

  const { config, projectDTO } = o;
  const R = translations.FileExportModules.docx[config.language];
  const document: string[] = [];

  // DOCUMENT TITLE
  o.feedback('Document title');
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
  o.feedback('Project info');
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
  o.feedback('Samples');
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
