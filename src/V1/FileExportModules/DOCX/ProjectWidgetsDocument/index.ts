import { Docx } from '../Docx';

import { ConfigDTO } from '@V1/Types/AppTypes';
import { ProjectDTO } from '@V1/Types/ProjectTypes';

import { document_Widget } from '../widgetDocument';

export async function document_ProjectWidgets(o: {
  config: ConfigDTO
  projectDTO: ProjectDTO
}): Promise<string[]> {

  const { config, projectDTO } = o;
  const { projectWidgets } = projectDTO;
  const document: string[] = [];

  for (let i = 0; i < projectWidgets.length; i++) {
    const widgetData = projectWidgets[i];
    document.push(
      Docx.paragraph([]),
      ...await document_Widget({
        config,
        widgetData: widgetData,
      }),
      Docx.paragraph([]),
    );
  }

  return document;
}
