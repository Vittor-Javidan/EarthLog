import React, { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { Linking, View } from 'react-native';

import DevTools from "@DevTools";
import { deepCopy } from '@V2/Globals/DeepCopy';
import { GPSInputData, InputAlertMessage, GPSAccuracyDTO, GPSFeaturesDTO, GPS_DTO, WidgetRules, WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import { GPSService, GPSWatcherService } from '@V2/Services_Core/GPSService';
import { ConfigService } from '@V2/Services/ConfigService';
import { PopUpAPI } from '@V2/Layers/API/PopUp';

import { LC } from '../__LC__';
import { ManualInput } from './ManualInput';
import { CheckboxOptions } from './CheckboxOptions';
import { DataDisplay } from './DataDisplay';
import { LoadingFeedback } from './LoadingFeedback';
import { RealTimeAccuracy } from './RealTimeAccuracy';
import { DeleteDataButton } from './DeleteDataButton';

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

  const config                            = useMemo(() => ConfigService.config, []);
  const R                                 = useMemo(() => translations.widgetInput.gps[config.language], []);
  const gpsWatcher                        = useMemo(() => new GPSWatcherService(deepCopy(props.inputData.value)), []);
  const [inputData    , setInputData    ] = useState<GPSInputData>(deepCopy(props.inputData));
  const [alertMessages, setAlertMessages] = useState<InputAlertMessage>({});
  const [accuracy     , setAccuracy     ] = useState<GPSAccuracyDTO>({
    coordinate: null,
    altitude: null,
  });
  const [features   , setFeatures       ] = useState<GPSFeaturesDTO>({
    editMode: false,
    gpsTracking: false,
    enableCoordinate: true,
    enableAltitude: true,
    gettingCurrentPosition: false,
    isManualInputOpen: false,
  });

  const noGPSData = Object.keys(inputData.value).length <= 0;

  /**
   * @WARNING
   * Never call this function from inside a state setter.
   * It can cause `Cannot update a component while rendering a different component` react error.
   */
  const asyncSave = useCallback(async (inputData: GPSInputData) => {
    props.onSave(deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string, inputData: GPSInputData) => {
    const newData: GPSInputData = { ...inputData, label: newLabel};
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave]);

  const onManualInput = useCallback((gpsData: GPS_DTO, inputData: GPSInputData) => {
    const newData: GPSInputData = { ...inputData, value: gpsData};
    gpsWatcher.setGpsData(deepCopy(gpsData));
    asyncSave(newData);
    setInputData(newData);
    setFeatures(prev => ({ ...prev, isManualInputOpen: false, editMode: false }));
  }, [asyncSave]);

  const toogleCoordinate = useCallback(async (checked: boolean, inputData: GPSInputData) => {
    await PopUpAPI.handleAlert(checked === false && inputData.value.coordinates !== undefined, {
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
    await PopUpAPI.handleAlert(checked === false && inputData.value.altitude !== undefined, {
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
    await PopUpAPI.handleAlert(noGPSData === false, {
      type: 'warning',
      question: R['This will overwrite current gps data. Confirm to proceed.'],
    }, async () => {
      setFeatures(prev => ({ ...prev, gpsTracking: true }));
      await gpsWatcher.watchPositionAsync(
        (gpsData) => {
          const newData: GPSInputData = { ...inputData, value: deepCopy(gpsData)};
          asyncSave(newData);
          setInputData(newData);
        },
        (accuracy) => setAccuracy(accuracy)
      );
    });
  }, [asyncSave]);

  const stopGPS = useCallback(() => {
    gpsWatcher.stopWatcher();
    setFeatures(prev => ({ ...prev, gpsTracking: false, editMode: false }));
  }, []);

  const onDeleteData = useCallback(async (noGPSData: boolean, inputData: GPSInputData) => {
    await PopUpAPI.handleAlert(noGPSData === false, {
      type: 'warning',
      question: R['This will delete current saved coordinate. Confirm to proceed.'],
    }, () => {
      const newData: GPSInputData = { ...inputData };
      if (newData.value.altitude)    { delete newData.value.altitude;    }
      if (newData.value.coordinates) { delete newData.value.coordinates; }
      asyncSave(newData);
      setInputData(newData)
      setFeatures(prev => ({ ...prev, editMode: false }));
    });
  }, [asyncSave])

  const onGPS_Snapshot = useCallback(async (noGPSData: boolean, inputData: GPSInputData) => {
    await PopUpAPI.handleAlert(noGPSData === false, {
      type: 'warning',
      question: R['This will overwrite current gps data. Confirm to proceed.'],
    }, async () => {
      setFeatures(prev => ({ ...prev, gettingCurrentPosition: true }));
      await gpsWatcher.getCurrentPosition((gpsData) => {
        const newData: GPSInputData = { ...inputData, value: deepCopy(gpsData)};
        if (!features.enableAltitude)   { newData.value.altitude    && delete newData.value.altitude    }
        if (!features.enableCoordinate) { newData.value.coordinates && delete newData.value.coordinates }
        asyncSave(newData);
        setInputData(newData);
        setFeatures(prev => ({ ...prev, gettingCurrentPosition: false }));
      });
    });
  }, [asyncSave]);

  const onMapOpen = useCallback((inputData: GPSInputData) => {
    const { coordinates } = inputData.value;
    if (coordinates) {
      const random = DevTools.gpsTutorialCoodinateMask();
      const latitude = DevTools.TUTORIAL_MODE ? coordinates.lat + random : coordinates.lat;
      const longitude = DevTools.TUTORIAL_MODE ? coordinates.long + random : coordinates.long;
      Linking.openURL(`https://www.google.com/maps?q=${latitude},${longitude}`);
    }
  }, []);

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

  return (<>
    <LC.Root

      label={inputData.label}
      lockedLabel={inputData.lockedLabel}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      blink={features.gpsTracking === true || features.gettingCurrentPosition === true}
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
          onPress_StopButton={() => stopGPS()}
          onPress_PlayButton={async () => await startGPS(noGPSData, inputData)}
          onPress_GPS_SnapshotButton={async () => await onGPS_Snapshot(noGPSData, inputData)}
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
          onMapPress={() => onMapOpen(inputData)}
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
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <ManualInput
              gpsData={inputData.value}
              features={features}
              onConfirm={(newGPSData) => onManualInput(newGPSData, inputData)}
              onOpen={() => setFeatures(prev => ({ ...prev, isManualInputOpen: true }))}
              onClose={() => setFeatures(prev => ({ ...prev, isManualInputOpen: false }))}
              theme={props.theme}
            />
            {features.isManualInputOpen === false && (
              <DeleteDataButton
                theme={props.theme}
                onPress={async () => await onDeleteData(noGPSData, inputData)}
              /> 
            )}
          </View>
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
  onPress_GPS_SnapshotButton: () => void
}) => {

  const { locked } = props;
  const { gpsTracking, gettingCurrentPosition, editMode } = props.features;
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      gettingCurrentPosition === true
      ? setBlinking(prev => !prev)
      : setBlinking(false);
    }, 250);
    return () => clearInterval(interval);
  }, [gettingCurrentPosition]);

  return (<>
    {locked && (
      <LC.NavbarIconButton
        iconName="lock-closed-sharp"
        onPress={() => {}}
        theme={{
          font: props.theme.wrong,
          background: props.theme.background,
        }}
      />
    )}
    {!locked && (<>
      {!gpsTracking && !gettingCurrentPosition && (<>
        <LC.NavbarIconButton
          iconName={'options-outline'}
          onPress={() => props.onPress_EditButton()}
          selected={editMode}
          theme={props.theme}
        />
      </>)}
      {!editMode && (<>
        {!gpsTracking && (<>
          <LC.NavbarIconButton
            iconName={'crosshairs-gps'}
            onPress={() => gettingCurrentPosition ? () => {}  : props.onPress_GPS_SnapshotButton()}
            theme={{
              font: blinking ? props.theme.confirm : props.theme.font,
              background: props.theme.background,
            }}
          />
        </>)}
        {!gettingCurrentPosition && (<>
          {!gpsTracking && (
            <LC.NavbarIconButton
              iconName="play"
              onPress={() => props.onPress_PlayButton()}
              theme={{
                font: props.theme.confirm,
                background: props.theme.background,
              }}
            />
          )}
          {gpsTracking && (
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
      </>)}
    </>)}
  </>);
});
