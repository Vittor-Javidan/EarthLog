import { HeadingLevel, Paragraph, TextRun } from 'docx';

import { ProjectDTO } from '@V1/Types/ProjectTypes';
import { ConfigDTO } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';

import { document_inputData } from '../InputsDocument';
import { document_Widget } from '../widgetDocument';

export async function document_AllSamples(o: {
  config: ConfigDTO
  projectDTO: ProjectDTO
}) {

  const { config, projectDTO } = o;
  const allSamples = projectDTO.samples;
  const R = translations.FileExportModules.docx[config.language];
  const document: Paragraph[] = [];

  // SAMPLE INFO
  for (let i = 0; i < allSamples.length; i++) {

    const sample = allSamples[i];

    document.push(
      new Paragraph({ text: '' })
    );
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
            children: [ `2.${i + 1} `, sample.sampleSettings.name ],
          }),
        ],
      })
    );

    const sampleGPSReference = sample.sampleSettings.gps;
    if (sampleGPSReference) {
      document.push(
        new Paragraph({ text: '' })
      );
      document.push(
        ...await document_inputData({
          config,
          inputData: {
            id_input: '',
            type: 'gps',
            label: R['Reference coordinate'],
            value: sampleGPSReference,
          },
        })
      );
      document.push(
        new Paragraph({ text: '' })
      );
    }

    // SAMPLE WIDGETS
    for (let j = 0; j < sample.sampleWidgets.length; j++) {

      const widgetData = sample.sampleWidgets[j];

      document.push(
        new Paragraph({ text: '' })
      );
      document.push(
        ...await document_Widget({
          config: o.config,
          widgetData: widgetData,
        })
      );
      document.push(
        new Paragraph({ text: '' })
      );
    }
  }

  return document;
}
