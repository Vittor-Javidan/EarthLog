import React, { useState, useMemo, useCallback, memo } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { GPSInputData, GPS_DTO, SampleSettings, StringInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import { useTimeout } from '@Hooks/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import ProjectService from '@Services/ProjectService';
import SyncService from '@Services/SyncService';

import { Text } from '@Text/index';
import { Layout } from '@Layout/index';
import { WidgetInput } from '@WidgetInput/index';

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

  const [sampleSettings,  setSampleSettings ] = useState<SampleSettings>(UtilService.deepCopy(CacheService.getSampleFromCache(id_sample)));
  const [saved,           setSaved          ] = useState<boolean>(true);

  useAutosave_sample(() => {
    setSaved(true);
  }, [sampleSettings, saved]);

  const onSaveName = useCallback((inputData: StringInputData) => {
    setSaved(false);
    setSampleSettings(prev => ({ ...prev, name: inputData.value }));
    props.onSampleNameUpdate(inputData.value);
  }, [props.onSampleNameUpdate]);

  const onSaveGPS = useCallback((gpsData: GPSInputData) => {
    setSaved(false);
    setSampleSettings(prev => ({ ...prev, gps: gpsData.value }));
    props.onGPSReferenceUpdate(UtilService.deepCopy(gpsData.value));
  }, [props.onGPSReferenceUpdate]);

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
    </Layout.PseudoWidget>
  );
});

/**
 * sampleSettings data processing before saving.
 * Each time a new data comes before a 200ms interval, it discards the old data to save the updated
 * version.
 */
function useAutosave_sample(onSave: () => void, deps: [SampleSettings, boolean]) {

  const [sampleSettings, saved] = deps;
  const id_project = useLocalSearchParams().id_project as string;

  useTimeout(async () => {

    if (saved) {
      return;
    }

    await ProjectService.updateSample(id_project, sampleSettings,
      async () => {
        CacheService.updateCache_SampleSettings(sampleSettings);
        await SyncService.syncData_Samples(id_project, sampleSettings.id_sample, 'updating');
        onSave();
      },
      (erroMessage) => alert(erroMessage)
    );

  }, [sampleSettings], 200);
}
