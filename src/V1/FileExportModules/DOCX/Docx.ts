import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'

import { path } from '@V1/Globals/Path'
import { FileSystemService } from '@V1/Services_Core/FileSystemService';

type TextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
}

/**
 * `docx` library is an option, but this library is just too slow to load images and create the docx file.
 *  So I created this custom implementation that creates the docx file structure manually.
*/
export class Docx {

  static baseDirectory =  path.getDir().TEMP();
  static documentImageCounter = 0;
  static imageFilePath: string = "";

  static setImageFilePath(id_project: string) {
    this.imageFilePath = path.getDir().PROJECTS.PROJECT.MEDIA.PICTURES(id_project);
  }

  static createWordFolder() {
    FileSystemService.createDirectory({ directory: `${this.baseDirectory}/word` });
  }

  static createContentTypesFile() {
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

  static createRelationshipFolder() {
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

  static createwebSettingsFile() {
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

  static createRelationshipFile() {
    const imageFiles = Docx_Utils.listImageFiles(this.imageFilePath);
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

  static async copyImageFilesToMediaFolder(o: {
    imageQuality: 'High' | 'Medium' | 'Low'
  }) {
    const { imageQuality } = o;
    const imageFiles = Docx_Utils.listImageFiles(this.imageFilePath);
    FileSystemService.createDirectory({ directory: `${this.baseDirectory}/word/media` });
    for (const fileName of imageFiles) {

      const originalFilePath = `${this.imageFilePath}/${fileName}`;
      const context = ImageManipulator.manipulate(originalFilePath)

      switch (imageQuality) {
        case 'High': context.resize({ width: 1920 }); break;
        case 'Medium': context.resize({ width: 800 }); break;
        case 'Low': context.resize({ width: 400 }); break;
      }

      const ref = (await context.renderAsync()).saveAsync({
        base64: true,
        compress: 0.8,
        format: SaveFormat.JPEG
      })

      const data = FileSystemService.readFile({
        directory: (await ref).uri,
        encoding: 'base64'
      });

      if (!data) {
        throw new Error(`Failed to read manipulated image file: ${(await ref).uri}`);
      }

      FileSystemService.writeFile({
        directory: `${this.baseDirectory}/word/media/${fileName}`,
        encoding: 'base64',
        data: data,
      })
    }
  }

  static createDocumentFile(paragraphs: string[]): void {
    FileSystemService.writeFile({
      directory: `${this.baseDirectory}/word/document.xml`,
      encoding: 'utf8',
      data: this.document(paragraphs),
    })
  }

  static finish(): void {
    this.documentImageCounter = 0;
    this.imageFilePath = "";
  }

  // ======================================================================================
  // DOCX ELEMENTS GENERATORS
  // ======================================================================================

  private static document(paragraphs: string[]): string {
    const joinedParagraphs = paragraphs.join("");
    return (
      `<w:document ` +
        `xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" ` +
        `xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" ` +
        `xmlns:cx1="http://schemas.microsoft.com/office/drawing/2015/9/8/chartex" ` +
        `xmlns:cx2="http://schemas.microsoft.com/office/drawing/2015/10/21/chartex" ` +
        `xmlns:cx3="http://schemas.microsoft.com/office/drawing/2016/5/9/chartex" ` +
        `xmlns:cx4="http://schemas.microsoft.com/office/drawing/2016/5/10/chartex" ` +
        `xmlns:cx5="http://schemas.microsoft.com/office/drawing/2016/5/11/chartex" ` +
        `xmlns:cx6="http://schemas.microsoft.com/office/drawing/2016/5/12/chartex" ` +
        `xmlns:cx7="http://schemas.microsoft.com/office/drawing/2016/5/13/chartex" ` +
        `xmlns:cx8="http://schemas.microsoft.com/office/drawing/2016/5/14/chartex" ` +
        `xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" ` +
        `xmlns:aink="http://schemas.microsoft.com/office/drawing/2016/ink" ` +
        `xmlns:am3d="http://schemas.microsoft.com/office/drawing/2017/model3d" ` +
        `xmlns:o="urn:schemas-microsoft-com:office:office" ` +
        `xmlns:oel="http://schemas.microsoft.com/office/2019/extlst" ` +
        `xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ` +
        `xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" ` +
        `xmlns:v="urn:schemas-microsoft-com:vml" `  +
        `xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" ` +
        `xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" ` +
        `xmlns:w10="urn:schemas-microsoft-com:office:word" ` +
        `xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" ` +
        `xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" ` +
        `xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" ` +
        `xmlns:w16cex="http://schemas.microsoft.com/office/word/2018/wordml/cex" ` +
        `xmlns:w16cid="http://schemas.microsoft.com/office/word/2016/wordml/cid" ` +
        `xmlns:w16="http://schemas.microsoft.com/office/word/2018/wordml" ` +
        `xmlns:w16du="http://schemas.microsoft.com/office/word/2023/wordml/word16du" ` +
        `xmlns:w16sdtdh="http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" ` +
        `xmlns:w16sdtfl="http://schemas.microsoft.com/office/word/2024/wordml/sdtformatlock" ` +
        `xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" ` +
        `xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" ` +
        `xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" ` +
        `xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" ` +
        `xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" ` +
        `mc:Ignorable="w14 w15 w16se w16cid w16 w16cex w16sdtdh w16sdtfl w16du wp14" ` +
      `>` +
        `<w:body>${joinedParagraphs}</w:body>` +
      `</w:document>`
    );
  }

  static paragraph(texts: string[]): string {
    const joinedText = texts.join("");
    return (
      `<w:p>${joinedText}</w:p>`
    );
  }

  static text(props: TextProps): string {

    const FONT_SIZE_CONVERSION = 2;

    const bold = props.bold ? "<w:b/>" : "";
    const italic = props.italic ? "<w:i/>" : "";
    const fontSize = props.fontSize ? `<w:sz w:val="${props.fontSize * FONT_SIZE_CONVERSION}"/>` : "";
    const color = props.color ? `<w:color w:val="${props.color}"/>` : "";
    const styles = (props.bold || props.italic || props.fontSize || props.color) ? `<w:rPr>${bold}${italic}${fontSize}${color}</w:rPr>` : "";


    const sanitizedInvalidXMLChars = sanitizeInvalidXMLChars(props.text);
    const parsedText = escapeSpecialXMLChars(sanitizedInvalidXMLChars);
    const textElement = `<w:t xml:space="preserve">${parsedText}</w:t>`;

    return (
      `<w:r>${styles}${textElement}</w:r>`
    );

    function escapeSpecialXMLChars(text: string): string {
      return text.replace(/[&<>'"]/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      }[char] ?? char))
    }

    function sanitizeInvalidXMLChars(text: string): string {
      return text.replace(
        /[\u0000-\u0008\u000B\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/g,
        ''
      );
    }
  }

  static async image(o: {
    id_picture: string,
  }): Promise<string> {

    const { id_picture } =  o;
    const fileId = "rId" + id_picture;
    console.log('Generating image for document:', id_picture);
    const { width, height } = await ImageManipulator.manipulate(`${path.getDir().TEMP()}/word/media/${id_picture}.jpg`).renderAsync();
    console.log('Original image dimensions:', width, height);
    const proportion = height / width;
    const MAX_WIDTH_EMU = 5391150
    const cx = MAX_WIDTH_EMU;
    const cy = Math.round(cx * proportion);

    console.log(`width: ${width}; height: ${height}`);
    console.log(`cx: ${cx}; cy: ${cy}`);

    this.documentImageCounter++;

    return (
      `<w:p>` +
        `<w:r>` +
          `<w:rPr>` +
            `<w:noProof/>` +
          `</w:rPr>` +
          `<w:lastRenderedPageBreak/>` +
          `<w:drawing>` +
            `<wp:inline>` +
              `<wp:extent cx="${cx}" cy="${cy}"/>` +
              `<wp:effectExtent l="0" t="0" r="0" b="0"/>` +
              `<wp:docPr id="${this.documentImageCounter}" name="Picture ${this.documentImageCounter}"/>` +
              `<wp:cNvGraphicFramePr/>` +
              `<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">` +
                `<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">` +
                  `<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">` +
                    `<pic:nvPicPr>` +
                      `<pic:cNvPr id="${this.documentImageCounter - 1}" name="${this.documentImageCounter - 1}"/>` +
                      `<pic:cNvPicPr/>` +
                    `</pic:nvPicPr>` +
                    `<pic:blipFill>` +
                      `<a:blip r:embed="${fileId}"/>` +
                      `<a:stretch>` +
                        `<a:fillRect/>` +
                      `</a:stretch>` +
                    `</pic:blipFill>` +
                    `<pic:spPr>` +
                      `<a:xfrm>` +
                        `<a:off x="0" y="0"/>` +
                        `<a:ext cx="${cx}" cy="${cy}"/>` +
                      `</a:xfrm>` +
                      `<a:prstGeom prst="rect">` +
                        `<a:avLst/>` +
                      `</a:prstGeom>` +
                    `</pic:spPr>` +
                  `</pic:pic>` +
                `</a:graphicData>` +
              `</a:graphic>` +
            `</wp:inline>` +
          `</w:drawing>` +
        `</w:r>` +
      `</w:p>`
    );
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
