import React, { useState, memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO, GPS_DTO, WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import { PopUpAPI } from '@V1/Layers/API/PopUp';
import { ConfigService } from '@V1/Services/ConfigService';

import { ManualInputButton } from './ManualInputButton';
import { InputsDisplay } from './InputsDisplay';

export const ManualInput = memo((props: {
  gpsData: GPS_DTO
  features: GPSFeaturesDTO
  theme: WidgetTheme
  onConfirm: (gpsData: GPS_DTO) => void
  onClose: () => void
  onOpen: () => void
}) => {

  const config                    = useMemo(() => ConfigService.config, []);
  const R                         = useMemo(() => translations.widgetInput.gps[config.language], []);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [error    , setError    ] = useState<boolean>(false);

  const noGPSData = Object.keys(props.gpsData).length <= 0;

  const onSave = useCallback(async (o: {
    newGPSData: GPS_DTO
    triggerAlert: boolean
  }) => {
    await PopUpAPI.handleAlert(o.triggerAlert, {
      type: 'warning',
      question: R['This will overwrite current gps data. Confirm to proceed.'],
    }, () => {
      setShowInput(false);
      setError(false);
      props.onConfirm(o.newGPSData);
    });
  }, [props.onConfirm]);

  const openManualInput = useCallback(() => {
    props.onOpen();
    setError(false);
    setShowInput(true);
  }, []);

  const closeManualInput = useCallback(() => {
    props.onClose();
    setError(false);
    setShowInput(false);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        paddingBottom: showInput ? 10 : 0,
        gap: 10,
        borderWidth: showInput ? 1 : 0,
        borderColor: error === true ? props.theme.wrong : props.theme.font,
      }}
    >
      {!showInput && (
        <ManualInputButton
          onPress={() => openManualInput()}
          theme={props.theme}
        />
      )}
      {showInput && (
        <InputsDisplay
          gpsData={props.gpsData}
          features={props.features}
          onSave={async (newGPSData) => await onSave({ newGPSData, triggerAlert: noGPSData === false })}
          onCancel={() => closeManualInput()}
          onError={() => setError(true)}
          theme={props.theme}
        />
      )}
    </View>
  );
});
