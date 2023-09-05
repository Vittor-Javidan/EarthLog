import React from 'react';

import { GPSFeaturesDTO, GPS_DTO } from '@Types/index';

import __DisplayDataStatic__ from './__DisplayStatic__';
import __DisplayDataInterative__ from './__DisplayDataInterative__';

export default function __DataDisplayHandler__(props: {
  gpsData: GPS_DTO
  features: GPSFeaturesDTO
  onError: () => void
  onChange_gpsData: (gpsData: GPS_DTO) => void
}) {

  const { coordinates, altitude } = props.gpsData;
  const { editMode } = props.features;

  const showNothing =
    editMode    === false     &&
    coordinates === undefined &&
    altitude    === undefined
  ;

  if (showNothing) {
    return <></>;
  }


  return (<>
    <__DisplayDataStatic__
      gpsData={props.gpsData}
      features={props.features}
    />
    <__DisplayDataInterative__
      gpsData={props.gpsData}
      features={props.features}
      onError={() => props.onError()}
      onChange_gpsData={(newGPSData => props.onChange_gpsData(newGPSData))}
    />
  </>);
}
