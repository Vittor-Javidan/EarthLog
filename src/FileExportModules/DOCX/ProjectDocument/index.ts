import { ProjectDTO } from '@Types/ProjectTypes';
import { AlignmentType, HeadingLevel, Paragraph, TextRun } from 'docx';

import { document_ProjectWidgets } from '../ProjectWidgetsDocument';
import { document_AllSamples } from '../AllSamplesDocument';

export function document_Project(projectDTO: ProjectDTO) {

  const document: Paragraph[] = [];

    // DOCUMENT TITLE
    document.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun({
            text: projectDTO.projectSettings.name,
            bold: true,
            font: 'Calibri',
            size: `${18}pt`,
            color: '#000000',
          }),
        ],
      })
    );

    // 1 - PROJECT INFO ========
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
            children: [ '1 ' + 'Project info' ],
          }),
        ],
      })
    );
    document.push(
      ...document_ProjectWidgets(projectDTO),
    );

    // 2 - SAMPLES =============
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
            children: [ '2 ' + projectDTO.projectSettings.sampleAlias.plural ],
          }),
        ],
      })
    );
    document.push(
      ...document_AllSamples(projectDTO),
    );

  return document;
}
