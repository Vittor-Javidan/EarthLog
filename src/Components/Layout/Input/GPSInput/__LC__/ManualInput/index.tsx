import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO, GPS_DTO } from '@Types/index';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';

import InputDisplayButton from './InputDisplayButton';
import InputsDisplay from './InputsDisplay';

export default function ManualInput(props: {
  noGPSData: boolean
  features: GPSFeaturesDTO
  onConfirm: (gpsData: GPS_DTO) => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [error    , setError    ] = useState<boolean>(false);

  async function onSave(newGPSData: GPS_DTO) {
    await AlertService.handleAlert(props.noGPSData,
      {
        question: 'current saved data will be replaced. Are you sure?',
        type: 'warning',
      },
      () => {
        setShowInput(false);
        setError(false);
        props.onConfirm(newGPSData);
      }
    );
  }

  function openManualInput() {
    setError(false);
    setShowInput(true);
  }

  function closeManualInput() {
    setError(false);
    setShowInput(false);
  }

  return (
    <View
      style={{
        borderRadius: 10,
        paddingBottom: showInput ? 10 : 0,
        gap: 10,
        borderWidth: showInput ? 1 : 0,
        borderColor: error === true ? theme.wrong : theme.onTertiary,
      }}
    >
      {!showInput && (
        <InputDisplayButton
          onPress={() => openManualInput()}
        />
      )}
      {showInput && (
        <InputsDisplay
          features={props.features}
          onSave={async (newGPSData) => await onSave(newGPSData)}
          onCancel={() => closeManualInput()}
          onError={() => setError(true)}
        />
      )}
    </View>
  );
}
