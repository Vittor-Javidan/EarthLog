import { MarkerData } from "@V1/Types/AppTypes";
import { GPS_DTO, ProjectDTO, SampleDTO } from "@V1/Types/ProjectTypes"

/** `key` id_input */
export type MapGPSFilter_Widget = Record<string, GPS_DTO>;
export type MapGPSFilter_Sample = {
  sampleGPS: GPS_DTO
  widgets: {
    [id_input: string]: MapGPSFilter_Widget
  }
}
export type MapGPSFilter_Project = {
  projectGPS: GPS_DTO
  samples: {
    [id_sample: string]: MapGPSFilter_Sample
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
        title: ProjectDTO.projectSettings.name,
        coordinates: {
          latitude: ProjectDTO.projectSettings.gps.coordinates.lat,
          longitude: ProjectDTO.projectSettings.gps.coordinates.long,
          accuracy: ProjectDTO.projectSettings.gps.coordinates.accuracy,
        },
        pinColor: "purple",
        image: 'INFO_PROJECT',
        zIndex: 1,
        description: "Project reference coordinate"
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
        title: sampleDTO.sampleSettings.name,
        coordinates: {
          latitude: sampleDTO.sampleSettings.gps.coordinates.lat,
          longitude: sampleDTO.sampleSettings.gps.coordinates.long,
          accuracy: sampleDTO.sampleSettings.gps.coordinates.accuracy,
        },
        pinColor: "blue",
        image: 'INFO_SAMPLE',
        zIndex: 2,
        description: "Sample reference coordinate"
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
            title: sampleDTO.sampleSettings.name,
            coordinates: {
              latitude: input.value.coordinates.lat,
              longitude: input.value.coordinates.long,
              accuracy: input.value.coordinates.accuracy,
            },
            pinColor: "orange",
            image: 'SATELLITE_INPUT',
            zIndex: 3,
            description: `${widget.widgetName}: ${input.label}`
          });
        }
      });
    });

    return markerData;
  }
}

