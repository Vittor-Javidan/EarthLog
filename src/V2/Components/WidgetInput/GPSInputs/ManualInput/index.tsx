import React, { useState, memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO, GPS_DTO, WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import AlertService from '@V2/Services/AlertService';
import ConfigService from '@V2/Services/ConfigService';

import { ManualInputButton } from './ManualInputButton';
import { InputsDisplay } from './InputsDisplay';

export const ManualInput = memo((props: {
  noGPSData: boolean
  features: GPSFeaturesDTO
  theme: WidgetTheme
  onConfirm: (gpsData: GPS_DTO) => void
}) => {

  const config                    = useMemo(() => ConfigService.config, []);
  const R                         = useMemo(() => translations.widgetInput.gps[config.language], []);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [error    , setError    ] = useState<boolean>(false);

  const onSave = useCallback(async (newGPSData: GPS_DTO) => {
    await AlertService.handleAlert(props.noGPSData, {
      type: 'warning',
      question: R['This will overwrite current gps data. Confirm to proceed.'],
    }, () => {
      setShowInput(false);
      setError(false);
      props.onConfirm(newGPSData);
    });
  }, [props.noGPSData, props.onConfirm]);

  const openManualInput = useCallback(() => {
    setError(false);
    setShowInput(true);
  }, []);

  const closeManualInput = useCallback(() => {
    setError(false);
    setShowInput(false);
  }, []);

  return (
    <View
      style={{
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
          features={props.features}
          onSave={async (newGPSData) => await onSave(newGPSData)}
          onCancel={() => closeManualInput()}
          onError={() => setError(true)}
          theme={props.theme}
        />
      )}
    </View>
  );
});
