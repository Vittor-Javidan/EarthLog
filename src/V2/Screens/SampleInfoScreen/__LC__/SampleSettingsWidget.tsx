import React, { useState, useMemo, useCallback, memo } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { deepCopy } from '@V2/Globals/DeepCopy';
import { GPSInputData, GPS_DTO, SampleSettings, StringInputData } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import { useTimeout } from '@V2/Hooks/index';
import ProjectService from '@V2/Services/ProjectService';
import ConfigService from '@V2/Services/ConfigService';
import CacheService from '@V2/Services/CacheService';
import ThemeService from '@V2/Services/ThemeService';

import { Text } from '@V2/Text/index';
import { Layout } from '@V2/Layout/index';
import { WidgetInput } from '@V2/WidgetInput/index';

export const SampleSettingsWidget = memo((props: {
  onSampleNameUpdate: (newName: string) => void
  onGPSReferenceUpdate: (gpsData: GPS_DTO) => void
}) => {

  const id_sample       = useLocalSearchParams().id_sample as string;
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.widgetThemes[config.widgetTheme], []);
  const R               = useMemo(() => translations.screen.sampleInfo[config.language], []);
  const unusedProps     = useMemo(() => ({
    editWidget:     false,
    isFirstInput:   false,
    isLastInput:    false,
    onInputDelete:  () => {},
    onInputMoveDow: () => {},
    onInputMoveUp:  () => {},
    widgetRules:    {},
  }), []);

  const [sampleSettings,  setSampleSettings ] = useState<SampleSettings>(deepCopy(CacheService.getSampleFromCache({ id_sample })));
  const [saved,           setSaved          ] = useState<boolean>(true);

  const onSaveName = useCallback((inputData: StringInputData) => {
    setSaved(false);
    setSampleSettings(prev => ({ ...prev, name: inputData.value }));
    props.onSampleNameUpdate(inputData.value);
  }, [props.onSampleNameUpdate]);

  const onSaveGPS = useCallback((gpsData: GPSInputData) => {
    setSaved(false);
    setSampleSettings(prev => ({ ...prev, gps: gpsData.value }));
    props.onGPSReferenceUpdate(deepCopy(gpsData.value));
  }, [props.onGPSReferenceUpdate]);

  useAutosave_sample(() => {
    setSaved(true);
  }, [sampleSettings, saved]);

  return (
    <Layout.PseudoWidget
      saved={saved}
      theme={theme}
    >
      <View
        style={{
          gap: 5,
        }}
      >
        <Text h2
          style={{
            textAlign: 'center',
            color: theme.font,
            paddingHorizontal: 5,
          }}
        >
          {R['Sample info']}
        </Text>
        <View
          style={{ gap: 15 }}
        >
          <WidgetInput.String
            inputData={{
              id_input: '',
              label: R['ID'],
              value: sampleSettings.id_sample,
              type: 'string',
              placeholder: '',
              lockedLabel: true,
              lockedData: true,
            }}
            onSave={() => {}}
            multiline={false}
            theme={theme}
            {...unusedProps}
          />
          <WidgetInput.String
            inputData={{
              id_input: '',
              label: R['Name'],
              value: sampleSettings.name,
              type: 'string',
              placeholder: R['Write the sample name here...'],
              lockedLabel: true,
              lockedData: !sampleSettings.rules.allowSampleNameChange,
            }}
            onSave={(inputData) => onSaveName(inputData)}
            multiline={false}
            theme={theme}
            {...unusedProps}
          />
          {sampleSettings.gps !== undefined && (
            <WidgetInput.GPS
              inputData={{
                id_input: '',
                label: 'GPS',
                value: sampleSettings.gps,
                type: 'gps',
                lockedLabel: true,
                lockedData: !sampleSettings.rules.allowGPSChange,
              }}
              onSave={(inputData) => onSaveGPS(inputData)}
              referenceGPSData={undefined}
              theme={theme}
              {...unusedProps}
            />
          )}
        </View>
      </View>
    </Layout.PseudoWidget>
  );
});

/**
 * sampleSettings data processing before saving.
 * Each time a new data comes before a 200ms interval, it discards the old data to save the updated
 * version.
 */
function useAutosave_sample(onSave: () => void, deps: [SampleSettings, boolean]) {

  const id_project = useLocalSearchParams().id_project as string;
  const [sampleSettings, saved] = deps;

  useTimeout(async () => {

    if (saved) {
      return;
    }

    await ProjectService.updateSample({
      id_project: id_project,
      sampleSettings: sampleSettings,
      sync: true,
      onSuccess: () => {
        CacheService.updateCache_SampleSettings({ sampleSettings });
        onSave();
      },
      onError: (erroMessage) => alert(erroMessage),
    });

  }, [sampleSettings], 200);
}
