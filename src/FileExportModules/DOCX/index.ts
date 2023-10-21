import { Document, Packer } from 'docx';

import { translations } from '@Translations/index';
import FileExportService from '@Services/FileExportService';
import ConfigService from '@Services/ConfigService';
import DataProcessService from '@APIServices/DataProcessService';

import { document_Project } from './ProjectDocument';

export default class DOCX_Module {

  static async buildAndShare_Project(id_project: string, fileName: string, feedback: (message: string) => void) {

    const RS = translations.FileExportModules.share[ConfigService.config.language];

    const projectDTO = await DataProcessService.buildProjectFromDatabase(id_project,
      (feedbackMessage) => feedback(feedbackMessage)
    );

    feedback(RS['Mounting document']);
    const document = new Document({
      sections: [{
        children: [ ...document_Project(projectDTO) ],
      }],
    });

    feedback(RS['Sharing document']);
    const fileData = await Packer.toBase64String(document);
    await FileExportService.shareFile(`${fileName}.docx`, fileData, 'base64');
  }
}
