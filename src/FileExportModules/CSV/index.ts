import { GPS_DTO } from '@Types/ProjectTypes';
import FileExportService from '@Services/FileExportService';
import DataProcessService from '@APIServices/DataProcessService';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

export default class CSV_Module {

  static async buildAndShare_Project_AllCoordinates(
    id_project: string,
    fileName: string,
    feedback: (message: string) => void
  ) {

    const RS = translations.FileExportModules.share[ConfigService.config.language];
    const R  = translations.FileExportModules.csv[ConfigService.config.language];

    const projectDTO = await DataProcessService.buildProjectFromDatabase(id_project,
      (feedbackMessage) => feedback(feedbackMessage)
    );

    feedback(RS['Mounting document']);
    let document =
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
    document += this.getCSVRow_GPS(projectDTO.projectSettings.gps, {
      source: R['Project settings'],
      widgetName: R['Project info'],
      inputLabel: R['GPS'],
    });

    for (let i = 0; i < projectDTO.samples.length; i++) {
      const sample = projectDTO.samples[i];

      // ADD SAMPLE REFERENCE GPS
      document += this.getCSVRow_GPS(sample.sampleSettings.gps, {
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
            document += this.getCSVRow_GPS(inputGPS, {
              source: sample.sampleSettings.name,
              widgetName: widget.widgetName,
              inputLabel: input.label,
            });
          }
        }
      }
    }

    feedback(RS['Sharing document']);
    await FileExportService.shareFile(`${fileName}.csv`, document, 'utf8');
  }

  private static getCSVRow_GPS(gps: GPS_DTO | undefined, options: {
    source: string
    widgetName: string
    inputLabel: string
  }): string {

    let document =
      this.stringToCSVText(options.source)     + ',' + // From
      this.stringToCSVText(options.widgetName) + ',' + // Widget Name
      this.stringToCSVText(options.inputLabel) + ','   // Input Name
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

// Empty fields: "my text", ,
// Number fiels: 2.00000
// Text: Just use the string conversor

// TODO: Use this during Project CSV export for all data
