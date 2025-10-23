import { SaveFormat, ImageManipulator } from 'expo-image-manipulator';

import { FileSystemService } from '@V2/GlobalServices/FileSystemService';
import { PathService } from '@V2/FileServices/PathService';


export class Docx_Builder {

  baseDirectory =  PathService.getDir().TEMP();

  /**
   * @WARNING This folder will copy all .jpg files from the imagesFilePath folder to the docx media folder.
  */
  async createWordFolder(o: {
    imagesFilePath:string,
    document: string
    feedback: (message: string) => void
  }) {
    const { imagesFilePath, document } = o;
    FileSystemService.createDirectory({ directory: `${this.baseDirectory}/word` });
    this.createContentTypesFile();
    this.createRelationshipFolder();
    this.createDocumentFile(document)
    this.createwebSettingsFile();
    this.createRelationshipFile(imagesFilePath);
    await this.copyImageFilesToMediaFolder({
      imagesFilePath,
      feedback: (message) => o.feedback(message),
    });
  }

  private createDocumentFile(document: string) {
    FileSystemService.writeFile({
      directory: `${this.baseDirectory}/word/document.xml`,
      encoding: 'utf8',
      data: document,
    })
  }

  private createwebSettingsFile() {
    FileSystemService.writeFile({
      directory: `${this.baseDirectory}/word/webSettings.xml`,
      encoding: 'utf8',
      data: (
        `<w:webSettings ` +
          `xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" ` +
          `xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ` +
          `xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" ` +
          `xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" ` + 
          `xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" ` +
          `xmlns:w16cex="http://schemas.microsoft.com/office/word/2018/wordml/cex" ` +
          `xmlns:w16cid="http://schemas.microsoft.com/office/word/2016/wordml/cid" ` +
          `xmlns:w16="http://schemas.microsoft.com/office/word/2018/wordml" ` +
          `xmlns:w16du="http://schemas.microsoft.com/office/word/2023/wordml/word16du" ` + 
          `xmlns:w16sdtdh="http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" ` +
          `xmlns:w16sdtfl="http://schemas.microsoft.com/office/word/2024/wordml/sdtformatlock" ` + 
          `xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" mc:Ignorable="w14 w15 w16se w16cid w16 w16cex w16sdtdh w16sdtfl w16du" ` +
        `/>`
      ),
    })
  }

  private createRelationshipFile(imagesFilePath: string) {
    const imageFiles = Docx_Utils.listImageFiles(imagesFilePath);
    const imageRelationships = imageFiles.map((fileName) => {
      return `<Relationship Id="rId${fileName.slice(0, -4)}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${fileName}"/>`
    })
    FileSystemService.createDirectory({ directory: `${this.baseDirectory}/word/_rels` });
    FileSystemService.writeFile({
      directory: `${this.baseDirectory}/word/_rels/document.xml.rels`,
      encoding: 'utf8',
      data: (
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
        `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
          imageRelationships.join("") +
        `</Relationships>`
      ),
    })
  }

  private async copyImageFilesToMediaFolder(o: {
    imagesFilePath: string,
    feedback: (message: string) => void
  }) {
    const { imagesFilePath } = o;
    const imageFiles = Docx_Utils.listImageFiles(imagesFilePath);
    FileSystemService.createDirectory({ directory: `${this.baseDirectory}/word/media` });
    for (const fileName of imageFiles) {

      o.feedback(`Processing image file: ${fileName}`);
      const originalFilePath = `${imagesFilePath}/${fileName}`;
      const context = ImageManipulator.manipulate(originalFilePath)

      o.feedback(`Resizing image file: ${fileName}`);
      context.resize({ width: 1920 });

      o.feedback(`Compressing and saving image file: ${fileName}`);
      const ref = (await context.renderAsync()).saveAsync({
        base64: true,
        compress: 0.8,
        format: SaveFormat.JPEG
      })

      o.feedback(`Copying manipulated image file to docx media folder: ${fileName}`);
      const data = FileSystemService.readFile({
        directory: (await ref).uri,
        encoding: 'base64'
      });

      if (!data) {
        throw new Error(`Failed to read manipulated image file: ${(await ref).uri}`);
      }

      o.feedback(`Copying manipulated image file to docx media folder: ${fileName}`);
      FileSystemService.writeFile({
        directory: `${this.baseDirectory}/word/media/${fileName}`,
        encoding: 'base64',
        data: data,
      })
    }
  }

  private createContentTypesFile() {
    /*
      brackets are not allowed in file names,
      so we need to create `[Content_Types].xml` manually during the zipping process.
    */
    FileSystemService.writeFile({
      directory: `${this.baseDirectory}/Content_Types.xml`,
      encoding: 'utf8',
      data: (
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
        `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
          `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
          `<Default Extension="xml" ContentType="application/xml"/>` +
          `<Default Extension="jpg" ContentType="image/jpeg"/>` +
          `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>` +
          `<Override PartName="/word/webSettings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml"/>` +
        `</Types>`    
      )
    })
  }

  private createRelationshipFolder() {
    FileSystemService.createDirectory({ directory: `${this.baseDirectory}/_rels` });
    FileSystemService.writeFile({
      directory: `${this.baseDirectory}/_rels/.rels`,
      encoding: 'utf8',
      data: (
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
          `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
          `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>` +
        `</Relationships>` 
      )
    })
  }
}

class Docx_Utils {

  static listImageFiles(imagesFilePath: string): string[] {
    const imageFiles = FileSystemService.readDirectory({ directory: imagesFilePath });
    if (!imageFiles) {
      throw new Error(`Images directory not found: ${imagesFilePath}`);
    }
    return imageFiles;
  }

  static readImageFile(imagesFilePath: string): string {
    const fileData = FileSystemService.readFile({
      directory: imagesFilePath,
      encoding: 'base64' }
    );
    if (!fileData) {
      throw new Error(`Image file not found: ${imagesFilePath}`);
    }
    return fileData;
  }
}
