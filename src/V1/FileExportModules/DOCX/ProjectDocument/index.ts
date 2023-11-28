import { AlignmentType, HeadingLevel, Paragraph, TextRun } from 'docx';

import { ConfigDTO } from '@V1/Types/AppTypes';
import { ProjectDTO } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';

import { document_ProjectWidgets } from '../ProjectWidgetsDocument';
import { document_AllSamples } from '../AllSamplesDocument';

export async function document_Project(o: {
  config: ConfigDTO,
  projectDTO: ProjectDTO,
  feedback: (message: string) => void
}) {

  const R = translations.FileExportModules.docx[o.config.language];
  const document: Paragraph[] = [];

  // DOCUMENT TITLE
  o.feedback('Document title');
  document.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
      children: [
        new TextRun({
          text: o.projectDTO.projectSettings.name,
          bold: true,
          font: 'Calibri',
          size: `${18}pt`,
          color: '#000000',
        }),
      ],
    })
  );

  // 1 - PROJECT INFO ========
  o.feedback('Project info');
  document.push(new Paragraph({ text: '' }));
  document.push(new Paragraph({ text: '' }));
  document.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          bold: true,
          underline: { color: '#000000' },
          color: '#000000',
          font: 'Calibri',
          size: `${16}pt`,
          children: [ '1 ' + R['Project info'] ],
        }),
      ],
    })
  );
  document.push(
    ...await document_ProjectWidgets(o),
  );

  // 2 - SAMPLES =============
  o.feedback('Samples');
  const sampleAlias_Plural = o.projectDTO.projectSettings.sampleAlias.plural;
  const sampleAliasToDisplay = sampleAlias_Plural !== '' ? sampleAlias_Plural : R['Samples'];
  document.push(new Paragraph({ text: '' }));
  document.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [
        new TextRun({
          bold: true,
          underline: { color: '#000000' },
          color: '#000000',
          font: 'Calibri',
          size: `${16}pt`,
          children: [ '2 ' + sampleAliasToDisplay ],
        }),
      ],
    })
  );
  document.push(
    ...await document_AllSamples(o),
  );

  return document;
}
