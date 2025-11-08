import { LanguageTag } from '@V1/Types/AppTypes';
import { ShareService } from '@V1/Services_Core/ShareService';
import { ProjectService } from '@V1/Services/ProjectService';
import { Csv } from './CSV';
import { GPS_CSV } from './GPS';

export default class CSV_Module {

  static async buildAndShare_Project_AllCoordinates(o: {
    id_project: string,
    fileName: string,
    language: LanguageTag,
    feedback: (message: string) => void
  }) {

    const { language, fileName } = o;

    o.feedback('Building project data');
    const projectDTO = await ProjectService.buildProjectDTO(o);

    o.feedback('Mounting header');
    let data = ''
    data += GPS_CSV.buildHeader({ language })

    o.feedback('Mounting project coordinates');
    data += GPS_CSV.getRow_Project({ language, projectDTO })

    o.feedback('Mounting samples coordinates');
    projectDTO.samples.forEach(sample => {
      data += GPS_CSV.getRow_Sample({ language, sample })
      sample.sampleWidgets.forEach(widget => {
        const sampleName = sample.sampleSettings.name;
        const widgetName = widget.widgetName;
        data += GPS_CSV.getRow_Widget({ sampleName, widgetName, widget })
      })
    })

    o.feedback('Creating CSV file');
    const directory = Csv.createCSVFile({ fileName, data });

    o.feedback('Sharing document');
    await ShareService.share({ directory });
  }
}
