import { Document, Packer } from 'docx';

import { translations } from '@Translations/index';
import DocumentFileExportService from '@Services/DocumentFileExportService';
import ConfigService from '@Services/ConfigService';
import DataProcessService from '@APIServices/DataProcessService';

import { document_Project } from './ProjectDocument';
import { ConfigDTO } from '@Types/AppTypes';

export default class DOCX_Module {

  static async buildAndShare_Project(
    id_project: string,
    fileName: string,
    config: ConfigDTO,
    feedback: (message: string) => void
  ) {

    const RS = translations.FileExportModules.share[ConfigService.config.language];

    const projectDTO = await DataProcessService.buildProjectFromDatabase(id_project, config,
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
    await DocumentFileExportService.shareFile(`${fileName}.docx`, fileData, 'base64');
  }
}
