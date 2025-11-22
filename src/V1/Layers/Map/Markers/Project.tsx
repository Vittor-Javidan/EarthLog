import { memo, useCallback } from "react"
import { Circle, Marker, MarkerPressEvent } from "react-native-maps"

import DevTools from "@DevTools"
import { AssetManager } from "@AssetManager"
import { MapScope } from "@V1/Types/AppTypes"
import { CompassMeasurementDTO, ProjectDTO, ProjectSettings } from "@V1/Types/ProjectTypes"
import { Markers_Sample } from "./Sample"
import { Markers_Widget } from "./Widget"

export const Markers_Project = memo((props: {
  projectDTO: ProjectDTO
  scope: MapScope
  openMeasurement: CompassMeasurementDTO | null
  showMarker_ProjectInfo: boolean
  showMarkers_SampleInfo: boolean
  showMarkers_GPSInput: boolean
  showMarkers_CompassMeasurement: boolean
}) => {
  const { projectDTO } = props
  return (<>
    <Marker_ProjectSettings
      show={props.showMarker_ProjectInfo}
      projectSettings={props.projectDTO.projectSettings}
    />
    {projectDTO.projectWidgets.map((widget) => (
      <Markers_Widget
        key={widget.id_widget}
        widgetData={widget}
        openMeasurement={props.openMeasurement}
        showMarkers_GPSInput={props.showMarkers_GPSInput}
        showMarkers_CompassMeasurement={props.showMarkers_CompassMeasurement}
      />
    ))}
    {props.projectDTO.samples.map((sample) => (
      <Markers_Sample
        key={sample.sampleSettings.id_sample}
        sampleDTO={sample}
        openMeasurement={props.openMeasurement}
        showMarkers_SampleInfo={props.showMarkers_SampleInfo}
        showMarkers_GPSInput={props.showMarkers_GPSInput}
        showMarkers_CompassMeasurement={props.showMarkers_CompassMeasurement}
      />
    ))}
  </>)
})

const Marker_ProjectSettings = memo((props: {
  show: boolean
  projectSettings: ProjectSettings
}) => {

  const { projectSettings, show } = props

  if (
    !show ||
    projectSettings.gps === undefined ||
    projectSettings.gps.coordinates === undefined
  ) {
    return <></>;
  }

  const coordinates = projectSettings.gps.coordinates;
  const latitude  = DevTools.TUTORIAL_MODE ? coordinates.lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : coordinates.lat;
  const longitude = DevTools.TUTORIAL_MODE ? coordinates.long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : coordinates.long;
  const accuracy = coordinates.accuracy;

  const onPress = useCallback((e: MarkerPressEvent) => {
    e.stopPropagation();
  }, []);

  return (<>
    <Marker
      title={projectSettings.name}
      coordinate={{ latitude, longitude }}
      onPress={onPress}
      image={{
        uri: AssetManager.getMarkerImage('INFO_PROJECT'),
        scale: 1,
      }}
    />
    <Circle
      center={{ latitude, longitude }}
      radius={accuracy}
      strokeColor={'purple'}
      fillColor={'rgba(0,0,0,0.1)'}
      strokeWidth={3}
    />
  </>)
})

