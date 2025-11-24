import {
  LanguageTag,
  CompassMeasurementDTO
} from "@V1/Types";

import { translations } from "@V1/Translations/index";
import { Csv } from "../CSV";

export class Compass_CSV {

  static buildHeader(o: {
    language: LanguageTag,
  }) {
    const R  = translations.FileExportModules.csv[o.language];
    return (
      '# ' +
      Csv.csvString(R['Source'])          + ',' +
      Csv.csvString(R['Widget name'])     + ',' +
      Csv.csvString(R['Label'])           + ',' +
      Csv.csvString('Measurement Label')  + ',' +
      Csv.csvString('Heading (°)')        + ',' +
      Csv.csvString('Dip (°)')            + '\n'
    )
  }

  static getRow_CompassInput(o: {
    source: string
    widgetName: string
    inputLabel: string
    compassData: CompassMeasurementDTO[]
  }) {
    const { source, widgetName, inputLabel, compassData } = o;
    let rows = '';
    compassData.forEach(data => {
      rows += (
        Csv.csvString(source)                  + ',' +
        Csv.csvString(widgetName)              + ',' +
        Csv.csvString(inputLabel)              + ',' +
        Csv.csvString(data.label)              + ',' +
        Csv.csvString(data.heading.toString()) + ',' +
        Csv.csvString(data.dip.toString())     + '\n'
      )
    });
    return rows;
  }
}