import {
  LanguageTag
} from '@V1/Types';

import { translations } from '@V1/Translations/index';
import { ShareService } from '@V1/Services_Core/ShareService';
import { ProjectService } from '@V1/Services/ProjectService';

import { Csv } from './CSV';
import { GPS_CSV } from './GPS';
import { Compass_CSV } from './Compass';

export default class CSV_Module {

  static async buildAndShare_Project_AllCoordinates(o: {
    id_project: string,
    fileName: string,
    language: LanguageTag,
    feedback: (message: string) => void
  }) {

    const { language, fileName } = o;
    const R = translations.FileExportModules.csv[language];

    o.feedback(R['Building project data']);
    const projectDTO = await ProjectService.buildProjectDTO(o);

    o.feedback(R['Mounting header']);
    let data = ''
    data += GPS_CSV.buildHeader({ language })

    o.feedback(R['Mounting project coordinates']);
    data += GPS_CSV.getRow_Project({ language, projectDTO })

    o.feedback(R['Mounting samples coordinates']);
    projectDTO.samples.forEach(sample => {
      data += GPS_CSV.getRow_Sample({ language, sample })
      sample.sampleWidgets.forEach(widget => {
        const sampleName = sample.sampleSettings.name;
        const widgetName = widget.widgetName;
        data += GPS_CSV.getRow_Widget({ sampleName, widgetName, widget })
      })
    })

    o.feedback(R['Creating CSV file']);
    const directory = Csv.createCSVFile({ fileName, data });

    o.feedback(R['Sharing document']);
    await ShareService.share({ directory });
  }

  static async buildAndShare_Project_AllMeasurements(o: {
    id_project: string,
    fileName: string,
    language: LanguageTag,
    feedback: (message: string) => void
  }) {

    const { language, fileName } = o;
    const R = translations.FileExportModules.csv[language];

    o.feedback(R['Building project data']);
    const projectDTO = await ProjectService.buildProjectDTO(o);

    o.feedback(R['Mounting header']);
    let data = ''
    data += Compass_CSV.buildHeader({ language })

    o.feedback(R['Mounting project measurements']);
    projectDTO.projectWidgets.forEach(widget => {
      widget.inputs.forEach(input => {
        if (input.type === 'compass') {
          data += Compass_CSV.getRow_CompassInput({
            source: R['Project settings'],
            widgetName: widget.widgetName,
            inputLabel: input.label,
            compassData: input.value
          })
        }
      })
    })

    o.feedback(R['Mounting samples measurements']);
    projectDTO.samples.forEach(sample => {
      sample.sampleWidgets.forEach(widget => {
        widget.inputs.forEach(input => {
          if (input.type === 'compass') {
            data += Compass_CSV.getRow_CompassInput({
              source: sample.sampleSettings.name,
              widgetName: widget.widgetName,
              inputLabel: input.label,
              compassData: input.value
            })
          }
        })
      })
    })

    o.feedback(R['Creating CSV file']);
    const directory = Csv.createCSVFile({ fileName, data });
    
    o.feedback(R['Sharing document']);
    await ShareService.share({ directory });
  }
}
