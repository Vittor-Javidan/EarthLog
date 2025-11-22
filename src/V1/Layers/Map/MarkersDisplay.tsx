import { memo, useState } from "react";

import { MapScope, NavigationMapScope } from "@V1/Types/AppTypes";
import { CompassMeasurementDTO, ProjectDTO } from "@V1/Types/ProjectTypes";
import { useBuildProject } from "./Hooks";
import { Markers } from "./Markers";

export const MarkersDisplay = memo((props: {
  scope: Exclude<MapScope, NavigationMapScope>
  showMap: boolean
  openMeasurement: CompassMeasurementDTO | null
  showMarker_ProjectInfo: boolean
  showMarkers_SampleInfo: boolean
  showMarkers_GPSInput: boolean
  showMarkers_CompassMeasurement: boolean
}) => {

  const [projectDTO, setProjectDTO] = useState<ProjectDTO | null>(null);

  useBuildProject({
    id_project: props.scope.id_project,
    scope: props.scope,
    showMap: props.showMap,
    onStartBuilding: () => setProjectDTO(null),
    onProjectBuilt: (projectDTO) => {
      setProjectDTO(projectDTO);
    }
  });

  if (projectDTO === null) {
    return <></>
  }

  if (props.scope.type === 'project') {
    return (
      <Markers.Project
        scope={props.scope}
        projectDTO={projectDTO}
        openMeasurement={props.openMeasurement}
        showMarker_ProjectInfo={props.showMarker_ProjectInfo}
        showMarkers_SampleInfo={props.showMarkers_SampleInfo}
        showMarkers_GPSInput={props.showMarkers_GPSInput}
        showMarkers_CompassMeasurement={props.showMarkers_CompassMeasurement}
      />
    )
  }

  if (props.scope.type === 'sample') {
    const scope = props.scope;
    const sampleDTO = projectDTO.samples.find(sample => sample.sampleSettings.id_sample === scope.id_sample);
    return sampleDTO ? (
      <Markers.Sample
        sampleDTO={sampleDTO}
        openMeasurement={props.openMeasurement}
        showMarkers_SampleInfo={props.showMarkers_SampleInfo}
        showMarkers_GPSInput={props.showMarkers_GPSInput}
        showMarkers_CompassMeasurement={props.showMarkers_CompassMeasurement}
      />
    ) : <></>;
  }

  return <></>
})
