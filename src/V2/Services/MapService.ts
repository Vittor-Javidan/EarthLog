import { MarkerData } from "@V2/Layers/API/Map";
import { GPS_DTO, ProjectDTO, SampleDTO } from "@V2/Types/ProjectTypes"

/** `key` id_input */
export type MapGPSData_Widget = Record<string, GPS_DTO>;
export type MapGPSData_Sample = {
  sampleGPS: GPS_DTO
  widgets: {
    [id_input: string]: MapGPSData_Widget
  }
}
export type MapGPSData_Project = {
  projectGPS: GPS_DTO
  samples: {
    [id_sample: string]: MapGPSData_Sample
  }
}

export class MapService {

  static getGPSMarkerData_Project(ProjectDTO: ProjectDTO, sampleFilter?: Record<string, boolean>): MarkerData[] {

    const markerData: MarkerData[] = [];

    if (
      ProjectDTO.projectSettings.gps !== undefined &&
      ProjectDTO.projectSettings.gps.coordinates !== undefined
    ) {
      markerData.push({
        id_marker: ProjectDTO.projectSettings.id_project,
        title: `Project: ${ProjectDTO.projectSettings.name}`,
        coordinates: {
          latitude: ProjectDTO.projectSettings.gps.coordinates.lat,
          longitude: ProjectDTO.projectSettings.gps.coordinates.long,
          accuracy: ProjectDTO.projectSettings.gps.coordinates.accuracy,
        },
        pinColor: "purple",
      });
    }

    ProjectDTO.samples.forEach((sample) => {
      if (sampleFilter?.[sample.sampleSettings.id_sample] === false) {
        return;
      }
      markerData.push(...this.getGPSMarkerData_Sample(sample));
    });

    return markerData;
  }

  static getGPSMarkerData_Sample(sampleDTO: SampleDTO): MarkerData[] {

    const markerData: MarkerData[] = [];

    if (
      sampleDTO.sampleSettings.gps !== undefined &&
      sampleDTO.sampleSettings.gps.coordinates !== undefined
    ) {
      markerData.push({
        id_marker: sampleDTO.sampleSettings.id_sample,
        title: `Sample: ${sampleDTO.sampleSettings.name}`,
        coordinates: {
          latitude: sampleDTO.sampleSettings.gps.coordinates.lat,
          longitude: sampleDTO.sampleSettings.gps.coordinates.long,
          accuracy: sampleDTO.sampleSettings.gps.coordinates.accuracy,
        },
        pinColor: "blue",
      });
    }

    sampleDTO.sampleWidgets.forEach((widget) => {
      widget.inputs.forEach((input) => {
        if (
          input.type === 'gps' &&
          input.value.coordinates !== undefined
        ) {
          markerData.push({
            id_marker: input.id_input,
            title: `${widget.widgetName}: ${input.label}`,
            coordinates: {
              latitude: input.value.coordinates.lat,
              longitude: input.value.coordinates.long,
              accuracy: input.value.coordinates.accuracy,
            },
            pinColor: "orange",
          });
        }
      });
    });

    return markerData;
  }
}

