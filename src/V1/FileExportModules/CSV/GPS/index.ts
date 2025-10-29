
import { LanguageTag } from "@V1/Types/AppTypes";
import { GPS_DTO, ProjectDTO, SampleDTO, WidgetData } from "@V1/Types/ProjectTypes";
import { translations } from "@V1/Translations/index";
import { Csv } from "../CSV";

export class GPS_CSV {

  static buildHeader(o: {
    language: LanguageTag,
  }) {
    const R  = translations.FileExportModules.csv[o.language];
    return (
      '# ' +
      Csv.csvString(R['Source'])                    + ',' +
      Csv.csvString(R['Widget name'])               + ',' +
      Csv.csvString(R['Label'])                     + ',' +
      Csv.csvString(R['Latitude (DD)'])             + ',' +
      Csv.csvString(R['Longitude (DD)'])            + ',' +
      Csv.csvString(R['Coordinates Accuracry (m)']) + ',' +
      Csv.csvString(R['Altitude (m)'])              + ',' +
      Csv.csvString(R['Altitude Accuracry (m)'])    + '\n'
    )
  }

  static getRow_Project(o: {
    language: LanguageTag,
    projectDTO: ProjectDTO
  }) {
    const R  = translations.FileExportModules.csv[o.language];
    return this.getRow_GPS({
      gps: o.projectDTO.projectSettings.gps,
      source: R['Project settings'],
      widgetName: R['Project info'],
      inputLabel: R['GPS'],
    });
  }

  static getRow_Sample(o: {
    language: LanguageTag,
    sample: SampleDTO
  }) {
    const R  = translations.FileExportModules.csv[o.language];
    return this.getRow_GPS({
      gps: o.sample.sampleSettings.gps,
      source: o.sample.sampleSettings.name,
      widgetName: R['Sample info'],
      inputLabel: R['GPS'],
    });
  }

  static getRow_Widget(o: {
    sampleName: string,
    widgetName: string,
    widget: WidgetData,
  }) {
    let csvRows = '';
    for (let k = 0; k < o.widget.inputs.length; k++) {
      const input = o.widget.inputs[k];
      if (input.type === 'gps') {
        csvRows += this.getRow_GPS({
          gps: input.value,
          source: o.sampleName,
          widgetName: o.widgetName,
          inputLabel: input.label,
        });
      }
    }
    return csvRows;
  }

  private static getRow_GPS(o: {
    gps: GPS_DTO | undefined,
    source: string
    widgetName: string
    inputLabel: string
  }): string {

    const { gps, source, widgetName, inputLabel } = o;

    let document =
      Csv.csvString(source)     + ',' + // From
      Csv.csvString(widgetName) + ',' + // Widget Name
      Csv.csvString(inputLabel) + ','   // Input Name
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
}