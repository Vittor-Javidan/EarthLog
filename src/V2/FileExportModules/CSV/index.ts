import { ConfigDTO } from '@V2/Types/AppTypes';
import { GPS_DTO } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import { ProjectService } from '@V2/Services/ProjectService';
import { ExportService } from '@V2/Services/ExportService';

export default class CSV_Module {

  static async buildAndShare_Project_AllCoordinates(o: {
    id_project: string,
    fileName: string,
    config: ConfigDTO,
    feedback: (message: string) => void
  }) {

    const R  = translations.FileExportModules.csv[o.config.language];
    const projectDTO = await ProjectService.buildProjectDTO(o);

    o.feedback('Mounting document');
    let document =
      '# ' +
      this.stringToCSVText(R['Source'])                    + ',' +
      this.stringToCSVText(R['Widget name'])               + ',' +
      this.stringToCSVText(R['Label'])                     + ',' +
      this.stringToCSVText(R['Latitude (DD)'])             + ',' +
      this.stringToCSVText(R['Longitude (DD)'])            + ',' +
      this.stringToCSVText(R['Coordinates Accuracry (m)']) + ',' +
      this.stringToCSVText(R['Altitude (m)'])              + ',' +
      this.stringToCSVText(R['Altitude Accuracry (m)'])    + '\n'
    ;

    // ADD PROJECT GPS
    document += this.getCSVRow_GPS({
      gps: projectDTO.projectSettings.gps,
      source: R['Project settings'],
      widgetName: R['Project info'],
      inputLabel: R['GPS'],
    });

    for (let i = 0; i < projectDTO.samples.length; i++) {
      const sample = projectDTO.samples[i];

      // ADD SAMPLE REFERENCE GPS
      document += this.getCSVRow_GPS({
        gps: sample.sampleSettings.gps,
        source: sample.sampleSettings.name,
        widgetName: R['Sample info'],
        inputLabel: R['GPS'],
      });

      for (let j = 0; j < sample.sampleWidgets.length; j++) {
        const widget = sample.sampleWidgets[j];

        // ADD WIDGET GPS
        for (let k = 0; k < widget.inputs.length; k++) {
          const input = widget.inputs[k];

          if (input.type === 'gps') {
            const inputGPS = input.value;

            // ADD GPS FROM INPUT
            document += this.getCSVRow_GPS({
              gps: inputGPS,
              source: sample.sampleSettings.name,
              widgetName: widget.widgetName,
              inputLabel: input.label,
            });
          }
        }
      }
    }

    o.feedback('Sharing document');
    await ExportService.shareFile({
      filename: `${o.fileName}.csv`,
      data: document,
      encoding: 'utf8',
    });
  }

  private static getCSVRow_GPS(o: {
    gps: GPS_DTO | undefined,
    source: string
    widgetName: string
    inputLabel: string
  }): string {

    const { gps, source, widgetName, inputLabel } = o;

    let document =
      this.stringToCSVText(source)     + ',' + // From
      this.stringToCSVText(widgetName) + ',' + // Widget Name
      this.stringToCSVText(inputLabel) + ','   // Input Name
    ;

    if (gps === undefined) {
      document += ',,,,\n';
      return document;
    }

    if (gps.coordinates !== undefined) {
      document +=
        gps.coordinates.lat                    + ',' + // Latitude
        gps.coordinates.long                   + ',' + // Longitude
        gps.coordinates.accuracy               + ','   // Accuracry (Coordinates)
      ;
    } else {
      document += ',,,';
    }

    if (gps.altitude !== undefined) {
      document +=
        gps.altitude.value                     + ',' + // Altitude
        gps.altitude.accuracy                  + '\n'  // Accuracry (Altitude)
      ;
    } else {
      document += ',\n';
    }

    return document;
  }

  private static stringToCSVText(text: string): string {
    text = text.replace(/"/g, '""');                                                                // If the text contains double quotes, replace them with double double quotes for escaping
    if (text.includes('\n')) {                                                                      // If the text contains a line break (newline), enclose it in double quotes
      text = `"${text}"`;
    }
    if (text.includes(',') || text.startsWith("'")) {                                               // Enclose the text in double quotes if it contains the delimiter (comma) or if it starts with a single quote
      text = `"${text}"`;
    }
    return text;
  }
}
