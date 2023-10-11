import React, { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { GPSInputData, InputAlertMessage, GPSAccuracyDTO, GPSFeaturesDTO, GPS_DTO, WidgetRules, WidgetTheme } from '@Types/ProjectTypes';
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

export const GPSInput = memo((props: {
  inputData: GPSInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  referenceGPSData: GPS_DTO | undefined
  widgetRules: WidgetRules
  theme: WidgetTheme
  onSave: (inputData: GPSInputData) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const config     = useMemo(() => ConfigService.config, []);
  const R          = useMemo(() => translations.widgetInput.gpsInput[config.language], []);
  const gpsWatcher = useMemo(() => new GPSWatcherService(UtilService.deepCopy(props.inputData.value)), []);

  const [inputData    , setInputData    ] = useState<GPSInputData>(UtilService.deepCopy(props.inputData));
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
    return () => { gpsWatcher.stopWatcher(); };
  }, []);

  useEffect(() => {
    GPSService.checkReferenceCoordinateDifference(props.referenceGPSData, inputData.value,
      () => {
        if (alertMessages.gpsDistanceAlertMessage) {
          setAlertMessages(prev => {
            delete prev.gpsDistanceAlertMessage;
            return { ...prev };
          });
        }
      },
      (distance) => setAlertMessages({
        gpsDistanceAlertMessage: R['* Reference distance: '] + `${distance}m`,
      })
    );
  }, [props.referenceGPSData, inputData]);

  const asyncSave = useCallback(async (inputData: GPSInputData) => {
    props.onSave(UtilService.deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string, inputData: GPSInputData) => {
    const newData: GPSInputData = { ...inputData, label: newLabel};
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave]);

  const onManualInput = useCallback((gpsData: GPS_DTO, inputData: GPSInputData) => {
    const newData: GPSInputData = { ...inputData, value: gpsData};
    gpsWatcher.setGpsData(gpsData);
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave]);

  const toogleCoordinate = useCallback(async (checked: boolean, inputData: GPSInputData) => {
    await AlertService.handleAlert(checked === false && inputData.value.coordinates !== undefined, {
      type: 'warning',
      question: R['This will delete current saved coordinate. Confirm to proceed.'],
    }, () => {
      gpsWatcher.enableCoordinates(checked);
      setFeatures(prev => ({ ...prev, enableCoordinate: checked }));
      if (!checked) {
        const newData: GPSInputData = { ...inputData };
        delete newData.value.coordinates;
        asyncSave(newData);
        setInputData(newData);
      }
    });
  }, [asyncSave]);

  const toogleAltitude = useCallback(async (checked: boolean, inputData: GPSInputData) => {
    await AlertService.handleAlert(checked === false && inputData.value.altitude !== undefined, {
      question: R['This will delete current saved altitude. Confirm to proceed.'],
      type: 'warning',
    }, () => {
      gpsWatcher.enableAltitude(checked);
      setFeatures(prev => ({ ...prev, enableAltitude: checked }));
      if (!checked) {
        const newData: GPSInputData = { ...inputData };
        delete newData.value.altitude;
        asyncSave(newData);
        setInputData(newData);
      }
    });
  }, [asyncSave]);

  const startGPS = useCallback(async (noGPSData: boolean, inputData: GPSInputData) => {
    await AlertService.handleAlert(noGPSData === false, {
      type: 'warning',
      question: R['This will overwrite current gps data. Confirm to proceed.'],
    }, async () => {
      setFeatures(prev => ({ ...prev, gpsON: true }));
      await gpsWatcher.watchPositionAsync(
        (gpsData) => {
          const newData: GPSInputData = { ...inputData, value: gpsData};
          asyncSave(newData);
          setInputData(newData);
        },
        (accuracy) => setAccuracy(accuracy)
      );
    });
  }, [asyncSave]);

  const stopGPS = useCallback(() => {
    gpsWatcher.stopWatcher();
    setFeatures(prev => ({ ...prev, gpsON: false, editMode: false }));
  }, []);

  return (<>
    <LC.Root

      label={inputData.label}
      lockedLabel={inputData.lockedLabel}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={(label) => onLabelChange(label, inputData)}
      onInputDelete={() => props.onInputDelete()}
      onInputMoveUp={() => props.onInputMoveUp()}
      onInputMoveDow={() => props.onInputMoveDow()}
      widgetRules={props.widgetRules}
      theme={props.theme}

      iconButtons={
        <IconButtons
          features={features}
          locked={inputData.lockedData}
          theme={props.theme}
          onPress_EditButton={() => setFeatures(prev => ({ ...prev, editMode: !prev.editMode }))}
          onPress_PlayButton={async () => await startGPS(noGPSData, inputData)}
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
          onToogle_Coordinate={async (checked) => await toogleCoordinate(checked, inputData)}
          onToogle_Altitude={async (checked) => await toogleAltitude(checked, inputData)}
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
            onConfirm={(newGPSData) => onManualInput(newGPSData, inputData)}
            theme={props.theme}
          />
        )}
      </View>
    </LC.Root>
  </>);
});

const IconButtons = memo((props: {
  locked: boolean | undefined
  features: GPSFeaturesDTO
  theme: WidgetTheme
  onPress_EditButton: () => void
  onPress_PlayButton: () => void
  onPress_StopButton: () => void
}) => {

  const showPlayButton = props.features.gpsON === false;
  const showStopButton = props.features.gpsON === true;

  return (<>
    {props.locked && (
      <LC.NavbarIconButton
        iconName="lock-closed-sharp"
        onPress={() => {}}
        theme={{
          font: props.theme.wrong,
          background: props.theme.background,
        }}
      />
    )}
    {!props.locked && (<>
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
    </>)}
  </>);
});
