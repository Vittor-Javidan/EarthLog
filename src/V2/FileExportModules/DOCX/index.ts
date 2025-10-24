import { ConfigDTO } from '@V2/Types/AppTypes';

import { translations } from '@V2/Translations/index';
import { FileSystemService } from '@V2/GlobalServices/FileSystemService';
import { PathService } from '@V2/FileServices/PathService';
import ShareService from '@V2/Services/ShareService';
import ProjectService from '@V2/Services/ProjectService';

import { Docx } from './Docx';
import { ZipService } from './Zip';
import { document_Project } from './ProjectDocument';

export default class DOCX_Module {

  static async buildAndShare_Project(o: {
    id_project: string,
    fileName: string,
    imageQuality: 'High' | 'Medium' | 'Low',
    config: ConfigDTO,
    feedback: (message: string) => void
    onFinish: () => void
    onError: () => void
  }) {

    const RS = translations.component.alert.shared[o.config.language];

    try {

      o.feedback(`Quality selected: ${o.imageQuality}`);
      o.feedback('Resetting temporary directory');
      FileSystemService.resetTempDirectory();
      Docx.setImageFilePath(o.id_project);

      o.feedback('Creating Word folder');
      Docx.createWordFolder();

      o.feedback('Creating content types file');
      Docx.createContentTypesFile();

      o.feedback('Creating relationship folder');
      Docx.createRelationshipFolder();

      o.feedback('Creating web settings file');
      Docx.createwebSettingsFile();

      o.feedback('Creating relationship file');
      Docx.createRelationshipFile();

      o.feedback('Copying image files');
      await Docx.copyImageFilesToMediaFolder({
        imageQuality: o.imageQuality
      })

      o.feedback('Creating document content');
      Docx.createDocumentFile(
        await document_Project({
          config: o.config,
          projectDTO: await ProjectService.buildProjectDTO(o),
        })
      );

      Docx.finish()
      
      o.feedback('Creating DOCX file');
      await ZipService.zipPathContents({
        sourcePath: PathService.getDir().TEMP(),
        outputPath: PathService.getDir().TEMP(),
        filename: `${o.fileName}.docx`,
        feedback: (message) => {},
      })

      o.feedback('Preparing to share document');
      await ShareService.share({
        directory: `${PathService.getDir().TEMP()}/${o.fileName}.docx`,
      })

      o.onFinish()

    } catch (error) {
      FileSystemService.resetTempDirectory();
      o.feedback(error instanceof Error ? error.message : JSON.stringify(error));
      o.feedback('Error building DOCX project export');
      o.feedback('Try reducing image quality');
      o.feedback(RS['Error!'])
      o.onError();
    }
  }
}
