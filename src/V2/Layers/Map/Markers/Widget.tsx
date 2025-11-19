import { memo } from "react";
import { Circle, Marker } from "react-native-maps";

import DevTools from "@DevTools";
import { AssetManager } from "@AssetManager";
import { GPSInputData, WidgetData } from "@V2/Types/ProjectTypes";

export const Markers_Widget = memo((props: {
    widgetData: WidgetData
}) => {
  return (<>
    {props.widgetData.inputs.map((input) => {
      if (input.type === 'gps') {
        return (
          <Marker_GPSInput
            key={input.id_input}
            inputData={input}
          />
        )
      }
    })}
  </>)
});

const Marker_GPSInput = memo((props: {
  inputData: GPSInputData
}) => {

  const { inputData } = props;
  const { value } = inputData;

  if (value.coordinates === undefined) {
    return <></>;
  }

  const coordinates = value.coordinates;
  const latitude  = DevTools.TUTORIAL_MODE ? coordinates.lat  + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : coordinates.lat;
  const longitude = DevTools.TUTORIAL_MODE ? coordinates.long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : coordinates.long;
  const accuracy = coordinates.accuracy;

  return (<>
    <Marker
      key={inputData.id_input}
      title={inputData.label}
      coordinate={{ latitude, longitude }} 
      image={{
        uri: AssetManager.getMarkerImage('SATELLITE_INPUT'),
        scale: 1,
      }}
    />
    <Circle
      center={{ latitude, longitude }}
      radius={accuracy}
      strokeColor={'orange'}
      fillColor={'rgba(0,0,0,0.1)'}
      strokeWidth={3}
    />
  </>)
});