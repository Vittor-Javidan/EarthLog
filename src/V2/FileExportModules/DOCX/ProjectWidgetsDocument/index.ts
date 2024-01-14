import { Paragraph } from 'docx';

import { ConfigDTO } from '@V2/Types/AppTypes';
import { ProjectDTO } from '@V2/Types/ProjectTypes';

import { document_Widget } from '../widgetDocument';

export async function document_ProjectWidgets(o: {
  config: ConfigDTO
  projectDTO: ProjectDTO
}) {

  const { config, projectDTO } = o;
  const { projectWidgets } = projectDTO;
  const document: Paragraph[] = [];

  for (let i = 0; i < projectWidgets.length; i++) {
    const widgetData = projectWidgets[i];
    document.push(
      new Paragraph({ text: '' })
    );
    document.push(
      ...await document_Widget({
        config,
        widgetData: widgetData,
      })
    );
    document.push(
      new Paragraph({ text: '' })
    );
  }

  return document;
}
