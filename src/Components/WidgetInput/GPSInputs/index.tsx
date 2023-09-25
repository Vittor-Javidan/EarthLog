import React, { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { GPSInputData, InputAlertMessage, InputStatus, GPSAccuracyDTO, GPSFeaturesDTO, GPS_DTO } from '@Types/ProjectTypes';
import { useTimeout } from '@Hooks/index';
import { translations } from '@Translations/index';
import UtilService from '@Services/UtilService';
import AlertService from '@Services/AlertService';
import ConfigService from '@Services/ConfigService';
import GPSService, { GPSWatcherService } from '@Services/GPSService';


import { LC } from '../__LC__';
import { ManualInput } from './ManualInput';
import { CheckboxOptions } from './CheckboxOptions';
import { DataDisplay } from './DataDisplay';
import { LoadingFeedback } from './LoadingFeedback';
import { RealTimeAccuracy } from './RealTimeAccuracy';
import { GPSInputTheme } from './ThemeType';

export const GPSInput = memo((props: {
  inputData: GPSInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  referenceGPSData: GPS_DTO | undefined
  theme: GPSInputTheme
  onSave: (inputData: GPSInputData | null, status: InputStatus ) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const config     = useMemo(() => ConfigService.config, []);
  const R          = useMemo(() => translations.Input.GPSInput[config.language], []);
  const gpsWatcher = useMemo(() => new GPSWatcherService(UtilService.deepCopy(props.inputData.value)), []);

  const [inputData    , setInputData    ] = useState<GPSInputData>(UtilService.deepCopy(props.inputData));
  const [saveSignal   , setSaveSignal   ] = useState<boolean>(false);
  const [alertMessages, setAlertMessages] = useState<InputAlertMessage>({});
  const [accuracy     , setAccuracy     ] = useState<GPSAccuracyDTO>({
    coordinate: null,
    altitude: null,
  });
  const [features   , setFeatures       ] = useState<GPSFeaturesDTO>({
    editMode: false,
    gpsON: false,
    enableCoordinate: true,
    enableAltitude: true,
  });

  const noGPSData = Object.keys(inputData.value).length <= 0;

  useEffect(() => {
    return () => { gpsWatcher.stopWatcher();};
  }, []);

  useTimeout(async () => {
    if (saveSignal) {
      props.onSave(UtilService.deepCopy(inputData), 'ready to save');
      setSaveSignal(false);
    }
  }, [inputData, saveSignal], 200);

  useEffect(() => {
    GPSService.checkReferenceCoordinateDifference(props.referenceGPSData, inputData.value,
      () => setAlertMessages(prev => {
        if (prev.gpsDistanceAlertMessage !== undefined) { delete prev.gpsDistanceAlertMessage; }
        return { ...prev };
      }),
      (distance) => setAlertMessages({
        gpsDistanceAlertMessage: R['* Reference distance: '] + `${distance}m`,
      })
    );
  }, [props.referenceGPSData, inputData.value]);

  const onLabelChange = useCallback((newLabel: string) => {
    if (inputData.lockedLabel !== true) {
      props.onSave(null, 'modifying');
      setInputData(prev => ({ ...prev, label: newLabel}));
      setSaveSignal(true);
    }
  }, [props.onSave, inputData]);

  const onManualInput = useCallback((gpsData: GPS_DTO) => {
    props.onSave(null, 'modifying');
    setInputData(prev => ({ ...prev, value: gpsData}));
    setSaveSignal(true);
  }, [props.onSave]);

  const toogleCoordinate = useCallback(async (checked: boolean) => {
    await AlertService.handleAlert(checked === false && inputData.value.coordinates !== undefined,
      {
        question: R['This will delete current saved coordinate. Confirm to proceed.'],
        type: 'warning',
      },
      () => {
        gpsWatcher.enableCoordinates(checked);
        setFeatures(prev => ({ ...prev, enableCoordinate: checked }));
        if (!checked) {
          props.onSave(null, 'modifying');
          setInputData(prev => {
            if (prev.value.coordinates !== undefined) { delete prev.value.coordinates !== undefined; }
            return {...prev };
          });
          setSaveSignal(true);
        }
      }
    );
  }, [props.onSave, inputData.value.coordinates]);

  const toogleAltitude = useCallback(async (checked: boolean) => {
    await AlertService.handleAlert(checked === false && inputData.value.altitude !== undefined,
      {
        question: R['This will delete current saved altitude. Confirm to proceed.'],
        type: 'warning',
      },
      () => {
        gpsWatcher.enableAltitude(checked);
        setFeatures(prev => ({ ...prev, enableAltitude: checked }));
        if (!checked) {
          props.onSave(null, 'modifying');
          setInputData(prev => {
            if (prev.value.altitude !== undefined) { delete prev.value.altitude !== undefined; }
            return {...prev };
          });
          setSaveSignal(true);
        }
      }
    );
  }, [props.onSave, inputData.value.altitude]);

  const startGPS = useCallback(async () => {
    await AlertService.handleAlert(noGPSData === false,
      {
        question: R['This will overwrite current gps data. Confirm to proceed.'],
        type: 'warning',
      },
      async () => {
        await gpsWatcher.watchPositionAsync(
          (gpsData) => setInputData(prev => ({ ...prev, value: gpsData})),
          (accuracy) => setAccuracy(accuracy)
        );
        setFeatures(prev => ({ ...prev, gpsON: true }));
      }
    );
  }, [noGPSData]);

  const stopGPS = useCallback(() => {
    props.onSave(null, 'modifying');
    gpsWatcher.stopWatcher();
    setFeatures(prev => ({ ...prev, gpsON: false, editMode: false }));
    setSaveSignal(true);
  }, [props.onSave]);

  return (<>
    <LC.Root

      label={inputData.label}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={(label) => onLabelChange(label)}
      onInputDelete={() => props.onInputDelete()}
      onInputMoveUp={() => props.onInputMoveUp()}
      onInputMoveDow={() => props.onInputMoveDow()}
      theme={props.theme}

      iconButtons={
        <IconButtons
          features={features}
          theme={props.theme}
          onPress_EditButton={() => setFeatures(prev => ({ ...prev, editMode: !prev.editMode }))}
          onPress_PlayButton={async () => await startGPS()}
          onPress_StopButton={() => stopGPS()}
        />
      }
    >
      <View
        style={{
          paddingVertical: 10,
          gap: 10,
        }}
      >
        <LC.AlertMessages
          alertMessages={alertMessages}
          theme={props.theme}
        />
        <CheckboxOptions
          features={features}
          onToogle_Coordinate={async (checked) => await toogleCoordinate(checked)}
          onToogle_Altitude={async (checked) => await toogleAltitude(checked)}
          theme={props.theme}
        />
        <DataDisplay
          inputData={inputData}
          features={features}
          theme={props.theme}
        />
        <RealTimeAccuracy
          accuracy={accuracy}
          features={features}
          theme={props.theme}
        />
        <LoadingFeedback
          features={features}
          theme={props.theme}
        />
        {features.editMode === true && (
          <ManualInput
            noGPSData={noGPSData === false}
            features={features}
            onConfirm={(newGPSData) => onManualInput(newGPSData)}
            theme={props.theme}
          />
        )}
      </View>
    </LC.Root>
  </>);
});

const IconButtons = memo((props: {
  features: GPSFeaturesDTO
  theme: GPSInputTheme
  onPress_EditButton: () => void
  onPress_PlayButton: () => void
  onPress_StopButton: () => void
}) => {

  const showPlayButton = props.features.gpsON === false;
  const showStopButton = props.features.gpsON === true;

  return (<>
    <LC.NavbarIconButton
      iconName={'options-outline'}
      onPress={() => props.onPress_EditButton()}
      selected={props.features.editMode}
      theme={props.theme}
    />
    {showPlayButton && (
      <LC.NavbarIconButton
        iconName="play"
        onPress={() => props.onPress_PlayButton()}
        theme={{
          font: props.theme.confirm,
          background: props.theme.background,
        }}
      />
    )}
    {showStopButton && (
      <LC.NavbarIconButton
        iconName="stop"
        onPress={() => props.onPress_StopButton()}
        theme={{
          font: props.theme.wrong,
          background: props.theme.background,
        }}
      />
    )}
  </>);
});
