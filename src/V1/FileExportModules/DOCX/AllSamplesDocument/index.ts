import { Docx } from '../Docx';

import { ProjectDTO } from '@V1/Types/ProjectTypes';
import { ConfigDTO } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';

import { FontService } from '@V1/Services_Core/FontService';

import { document_inputData } from '../InputsDocument';
import { document_Widget } from '../widgetDocument';

export async function document_AllSamples(o: {
  config: ConfigDTO
  projectDTO: ProjectDTO
}): Promise<string[]> {

  const { config, projectDTO } = o;
  const allSamples = projectDTO.samples;
  const R = translations.FileExportModules.docx[config.language];
  const document: string[] = [];

  for (let i = 0; i < allSamples.length; i++) {

    const sample = allSamples[i];

    document.push(
      Docx.paragraph([]),
      Docx.paragraph([
        Docx.text({
          text: `2.${i + 1} ${sample.sampleSettings.name}`,
          fontSize: FontService.FONTS.h3,
          color: '000000',
        })
      ])
    );

    const sampleGPSReference = sample.sampleSettings.gps;
    if (sampleGPSReference) {
      document.push(
        Docx.paragraph([]),
        ...await document_inputData({
          config,
          inputData: {
            id_input: '',
            type: 'gps',
            label: R['Reference coordinate'],
            value: sampleGPSReference,
          },
        }),
        Docx.paragraph([])
      );
    }

    // SAMPLE WIDGETS
    for (let j = 0; j < sample.sampleWidgets.length; j++) {

      const widgetData = sample.sampleWidgets[j];

      document.push(
        Docx.paragraph([]),
        ...await document_Widget({
          config: o.config,
          widgetData: widgetData,
        }),
        Docx.paragraph([]),
      );
    }
  }

  return document;
}
