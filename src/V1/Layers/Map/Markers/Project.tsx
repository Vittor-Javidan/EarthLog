import { memo } from "react"
import { Circle, Marker } from "react-native-maps"

import DevTools from "@DevTools"
import { AssetManager } from "@AssetManager"
import { MapScope } from "@V1/Types/AppTypes"
import { ProjectDTO, ProjectSettings } from "@V1/Types/ProjectTypes"
import { Markers_Sample } from "./Sample"
import { Markers_Widget } from "./Widget"

export const Markers_Project = memo((props: {
  projectDTO: ProjectDTO
  scope: MapScope
}) => {
  const { projectDTO } = props
  return (<>
    <Marker_ProjectSettings
      projectSettings={props.projectDTO.projectSettings}
    />
    {projectDTO.projectWidgets.map((widget) => (
      <Markers_Widget
        key={widget.id_widget}
        widgetData={widget}
      />
    ))}
    {props.projectDTO.samples.map((sample) => (
      <Markers_Sample
        key={sample.sampleSettings.id_sample}
        sampleDTO={sample}
      />
    ))}
  </>)
})

const Marker_ProjectSettings = memo((props: {
  projectSettings: ProjectSettings
}) => {

  const { projectSettings } = props

  if (
    projectSettings.gps === undefined ||
    projectSettings.gps.coordinates === undefined
  ) {
    return <></>;
  }

  const coordinates = projectSettings.gps.coordinates;
  const latitude  = DevTools.TUTORIAL_MODE ? coordinates.lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : coordinates.lat;
  const longitude = DevTools.TUTORIAL_MODE ? coordinates.long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : coordinates.long;
  const accuracy = coordinates.accuracy;

  return (<>
    <Marker
      title={projectSettings.name}
      coordinate={{ latitude, longitude }}
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

