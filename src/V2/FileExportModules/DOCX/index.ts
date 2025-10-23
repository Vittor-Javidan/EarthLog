import { ConfigDTO } from '@V2/Types/AppTypes';

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
    config: ConfigDTO,
    feedback: (message: string) => void
  }) {

    o.feedback('Resetting temporary directory');
    FileSystemService.resetTempDirectory();
    Docx.setImageFilePath(o.id_project);

    o.feedback('Mounting document');
    const document = await document_Project({
      config: o.config,
      projectDTO: await ProjectService.buildProjectDTO(o),
      feedback: (message) => o.feedback(message),
    })
    
    o.feedback('Building document');
    await Docx.build({
      document: document,
      feedback: (message) => o.feedback(message),
    })

    o.feedback('Creating DOCX file');
    await ZipService.zipPathContents({
      sourcePath: PathService.getDir().TEMP(),
      outputPath: PathService.getDir().TEMP(),
      filename: `${o.fileName}.docx`,
      feedback: (msg: string) => o.feedback(msg),
    })

    o.feedback('Preparing to share document');
    await ShareService.share({
      directory: `${PathService.getDir().TEMP()}/${o.fileName}.docx`,
    })
  }
}
