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

  function onChange_Latitude(newLatitude: number) {
    const newGPSData: GPS_DTO = {
      ...props.gpsData,
      coordinates: {
        lat: newLatitude,
        long: props.gpsData.coordinates?.long ?? 0,
        accuracy: props.gpsData.coordinates?.accuracy ?? 999,
      },
    };
    props.onChange_gpsData(newGPSData);
  }

  function onChange_Longitude(newLongitude: number) {
    const newGPSData: GPS_DTO = {
      ...props.gpsData,
      coordinates: {
        lat: props.gpsData.coordinates?.lat ?? 0,
        long: newLongitude,
        accuracy: props.gpsData.coordinates?.accuracy ?? 999,
      },
    };
    props.onChange_gpsData(newGPSData);
  }

  function onChange_CoordinateAcc(newAccuracy:  number) {
    const newGPSData: GPS_DTO = {
      ...props.gpsData,
      coordinates: {
        lat: props.gpsData.coordinates?.lat ?? 0,
        long: props.gpsData.coordinates?.long ?? 0,
        accuracy: newAccuracy,
      },
    };
    props.onChange_gpsData(newGPSData);
  }

  function onChange_Altitude(newAltitude: number) {
    const newGPSData: GPS_DTO = {
      ...props.gpsData,
      altitude: {
        value: newAltitude,
        accuracy: props.gpsData.altitude?.accuracy ?? 999,
      },
    };
    props.onChange_gpsData(newGPSData);
  }

  function onChange_AltitudeAcc(newAccuracy: number) {
    const newGPSData: GPS_DTO = {
      ...props.gpsData,
      altitude: {
        value: props.gpsData.altitude?.value ?? 0,
        accuracy: newAccuracy,
      },
    };
    props.onChange_gpsData(newGPSData);
  }

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
      onChange_Latitude={(newLat) => onChange_Latitude(newLat)}
      onChange_Longitude={(newLong) => onChange_Longitude(newLong)}
      onChange_CoordinateAcc={(newAcc) => onChange_CoordinateAcc(newAcc)}
      onChange_Altitude={(newAlt) => onChange_Altitude(newAlt)}
      onChange_AltitudeAcc={(newAcc) => onChange_AltitudeAcc(newAcc)}
    />
  </>);
}
