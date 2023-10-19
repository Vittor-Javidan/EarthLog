import { ProjectDTO } from '@Types/ProjectTypes';
import { HeadingLevel, Paragraph, TextRun } from 'docx';

import { document_inputData } from '../InputsDocument';
import { document_Widget } from '../widgetDocument';

export function document_AllSamples(projectDTO: ProjectDTO) {

  const { samples } = projectDTO;
  const document: Paragraph[] = [];

  // SAMPLE INFO
  for (let i = 0; i < samples.length; i++) {
    document.push(new Paragraph({ text: '' }));
    document.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [
          new TextRun({
            bold: true,
            underline: { color: '#000000' },
            color: '#000000',
            font: 'Calibri',
            size: `${14}pt`,
            children: [ `2.${i + 1} ` + samples[i].sampleSettings.name ],
          }),
        ],
      })
    );

    const sampleGPSReference = samples[i].sampleSettings.gps;
    if (sampleGPSReference) {
      document.push(new Paragraph({ text: '' }));
      document.push(
        ...document_inputData({
          id_input: '',
          type: 'gps',
          label: 'Sample coordinate',
          value: sampleGPSReference,
        })
      );
      document.push(new Paragraph({ text: '' }));
    }

    // SAMPLE WIDGETS
    for (let j = 0; j < samples[i].sampleWidgets.length; j++) {
      document.push(new Paragraph({ text: '' }));
      document.push(...document_Widget(samples[i].sampleWidgets[j]));
      document.push(new Paragraph({ text: '' }));
    }
  }

  return document;
}
