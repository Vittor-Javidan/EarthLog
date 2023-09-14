import React, { useState, useEffect, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { GPSAccuracyDTO, GPSFeaturesDTO, GPS_DTO } from '@Types/index';
import { translations } from '@Translations/index';
import UtilService from '@Services/UtilService';
import AlertService from '@Services/AlertService';
import ConfigService from '@Services/ConfigService';
import { GPSWatcherService } from '@Services/GPSService';

import InputRoot from '../Root';
import { LC } from './__LC__';
import { TC } from './__TC__';

export default function GPSInput(props: {
  label: string
  gpsData: GPS_DTO,
  backgroundColor?: string
  color?: string
  hideDeleteButton?: boolean
  style?: StyleProp<ViewStyle>
  onPress_Save: (gpsData: GPS_DTO) => void
  onPress_Delete: () => void
}) {

  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.GPSInput[language], []);
  const gpsWatcher = useMemo(() => new GPSWatcherService(UtilService.deepCopy(props.gpsData)), []);

  const [gpsData, setGPSData] = useState<GPS_DTO>(
    UtilService.deepCopy(props.gpsData)
  );

  const [accuracy, setAccuracy] = useState<GPSAccuracyDTO>({
    coordinate: null,
    altitude: null,
  });

  const [features, setFeatures] = useState<GPSFeaturesDTO>({
    editMode: false,
    gpsON: false,
    enableCoordinate: true,
    enableAltitude: true,
  });

  const noGPSData = Object.keys(gpsData).length <= 0;

  useEffect(() => {
    return () => { gpsWatcher.stopWatcher();};
  }, []);

  useEffect(() => {
    gpsWatcher.setGpsData(props.gpsData);
    gpsWatcher.enableAltitude(true);
    gpsWatcher.enableCoordinates(true);
    setGPSData(UtilService.deepCopy(props.gpsData));
    setFeatures(prev => ({
      ...prev,
      editMode: false,
      enableCoordinate: true,
      enableAltitude: true,
    }));
  }, [props.gpsData]);

  function toogleCoordinate(checked: boolean) {
    gpsWatcher.enableCoordinates(checked);
    setFeatures(prev => ({ ...prev, enableCoordinate: checked }));
    if (!checked) {
      setGPSData(prev => {
        if (prev.coordinates !== undefined) { delete prev.coordinates; }
        return { ...prev };
      });
    }
  }

  function toogleAltitude(checked: boolean) {
    gpsWatcher.enableAltitude(checked);
    setFeatures(prev => ({ ...prev, enableAltitude: checked }));
    if (!checked) {
      setGPSData(prev => {
        if (prev.altitude !== undefined) { delete prev.altitude; }
        return { ...prev};
      });
    }
  }

  function stopGPS() {
    gpsWatcher.stopWatcher();
    setFeatures(prev => ({ ...prev, gpsON: false, editMode: false }));
    props.onPress_Save(UtilService.deepCopy(gpsData));
  }

  async function startGPS() {
    await AlertService.handleAlert(noGPSData === false,
      {
        question: R['This will overwrite current gps data. Confirm to proceed.'],
        type: 'warning',
      },
      async () => {
        await gpsWatcher.watchPositionAsync(
          (gpsData) => setGPSData(gpsData),
          (accuracy) => setAccuracy(accuracy)
        );
        setFeatures(prev => ({ ...prev, gpsON: true }));
      }
    );
  }

  async function onDelete() {
    await AlertService.handleAlert(noGPSData === false,
      {
        question: R['This Will delete current GPS data. Confirm to proceed.'],
        type: 'warning',
      },
      () => props.onPress_Delete()
    );
  }

  return (<>
    <InputRoot

      label={props.label}
      backgroundColor={props.backgroundColor}
      color={props.color}
      style={[{
        paddingVertical: 10,
        gap: 10,
      },props.style]}

      iconButtons={
        <TC.IconButtons
          hideDeleteButton={props.hideDeleteButton}
          features={features}
          onPress_TrashButton={async () => await onDelete()}
          onPress_EditButton={() => setFeatures(prev => ({ ...prev, editMode: !prev.editMode }))}
          onPress_PlayButton={async () => await startGPS()}
          onPress_StopButton={() => stopGPS()}
        />
      }
    >
      <LC.CheckboxOption
        features={features}
        onToogle_Coordinate={(checked) => toogleCoordinate(checked)}
        onToogle_Altitude={(checked) => toogleAltitude(checked)}
      />
      <LC.DataDisplay
        gpsData={gpsData}
        features={features}
      />
      <LC.Display_RealTimeAccuracy
        accuracy={accuracy}
        features={features}
      />
      <LC.Loading
        features={features}
      />
      {features.editMode === true && (
        <LC.ManualInput
          noGPSData={noGPSData === false}
          features={features}
          onConfirm={(newGPSData) => props.onPress_Save(newGPSData)}
        />
      )}
    </InputRoot>
  </>);
}
