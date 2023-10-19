import { Paragraph } from 'docx';

import { ProjectDTO } from '@Types/ProjectTypes';
import { document_Widget } from '../widgetDocument';

export function document_ProjectWidgets(projectDTO: ProjectDTO) {

  const { projectWidgets } = projectDTO;
  const document: Paragraph[] = [];

  for (let i = 0; i < projectWidgets.length; i++) {
    document.push(new Paragraph({ text: '' }));
    document.push(...document_Widget(projectWidgets[i]));
    document.push(new Paragraph({ text: '' }));
  }

  return document;
}
