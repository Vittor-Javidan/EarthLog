import { memo, useCallback } from "react"
import { Circle, Marker, MarkerPressEvent } from "react-native-maps"

import DevTools from "@DevTools"
import { AssetManager } from "@AssetManager"
import { CompassMeasurementDTO, SampleDTO, SampleSettings } from "@V1/Types/ProjectTypes"
import { Markers_Widget } from "./Widget"

export const Markers_Sample = memo((props: {
  sampleDTO: SampleDTO
  openMeasurement: CompassMeasurementDTO | null
  showMarkers_SampleInfo: boolean
  showMarkers_GPSInput: boolean
  showMarkers_CompassMeasurement: boolean
}) => { 
  return (<>
    <Marker_SampleSettings
      key={props.sampleDTO.sampleSettings.id_sample}
      show={props.showMarkers_SampleInfo}
      sampleSettings={props.sampleDTO.sampleSettings}
    />
    {props.sampleDTO.sampleWidgets.map((widget) => (
      <Markers_Widget
        key={widget.id_widget}
        widgetData={widget}
        openMeasurement={props.openMeasurement}
        showMarkers_GPSInput={props.showMarkers_GPSInput}
        showMarkers_CompassMeasurement={props.showMarkers_CompassMeasurement}
      />
    ))}
  </>)
})

const Marker_SampleSettings = memo((props: {
  show: boolean
  sampleSettings: SampleSettings
}) => {
  const { sampleSettings, show } = props

  if (
    !show ||
    sampleSettings.gps === undefined ||
    sampleSettings.gps.coordinates === undefined
  ) {
    return <></>;
  }

  const coordinates = sampleSettings.gps.coordinates;
  const latitude  = DevTools.TUTORIAL_MODE ? coordinates.lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : coordinates.lat;
  const longitude = DevTools.TUTORIAL_MODE ? coordinates.long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : coordinates.long;
  const accuracy = coordinates.accuracy;

  const onPress = useCallback((e: MarkerPressEvent) => {
    e.stopPropagation();
  }, []);

  return (<>
    <Marker
      title={sampleSettings.name}
      coordinate={{ latitude, longitude }}
      onPress={onPress}
      image={{
        uri: AssetManager.getMarkerImage('INFO_SAMPLE'),
        scale: 1,
      }}
    />
    <Circle
      center={{ latitude, longitude }}
      radius={accuracy}
      strokeColor={'blue'}
      fillColor={'rgba(0,0,0,0.1)'}
      strokeWidth={3}
    />
  </>)
})
