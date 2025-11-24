import {
  ConfigDTO,
  ProjectDTO
} from '@V1/Types';

import { Docx } from '../Docx';
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
