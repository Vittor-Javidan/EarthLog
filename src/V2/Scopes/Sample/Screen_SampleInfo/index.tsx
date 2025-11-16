import React, { memo, useCallback, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';

import { deepCopy } from '@V2/Globals/DeepCopy';
import { GPS_DTO, GPSInputData, SampleSettings, StringInputData } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';
import { CacheService } from '@V2/Services/CacheService';
import { ProjectService } from '@V2/Services/ProjectService';
import { MediaService } from '@V2/Services/MediaService';
import { useTimeout } from '@V2/Hooks/index';

import { Text } from '@V2/Text/index';
import { Layout } from '@V2/Layout/index';
import { WidgetInput } from '@V2/WidgetInput/index';
import { TC } from './__TC__';

export const Screen_SampleInfo = memo((props: {
  id_project: string;
  id_sample: string;
  onSampleNameUpdate: (newName: string) => void
  onGPSReferenceUpdate: (gpsData: GPS_DTO) => void
  onScreenButton_DeleteSample: (id_project: string) => void
}) => {

  const { id_project, id_sample } = props;
  const config      = useMemo(() => ConfigService.config, []);
  const theme       = useMemo(() => ThemeService.widgetThemes[config.widgetTheme], []);
  const R           = useMemo(() => translations.screen.sampleInfo[config.language], []);
  const unusedProps = useMemo(() => ({
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

  const onDelete_Sample = useCallback(async () => {
    await ProjectService.deleteSample({
      id_project: id_project,
      sampleSettings: sampleSettings,
      sync: true,
      onSuccess: async () => {
        await MediaService.deleteMediaRecursively({
          scope: 'sample',
          id_project: id_project,
          widgetArray: CacheService.allWidgets_Sample,
        });
        CacheService.removeFromSamples({ id_sample });
        props.onScreenButton_DeleteSample(id_project);
      },
      onError: (errorMessage) => alert(errorMessage),
    });
  }, []);

  useAutosave_sample({
    id_project: id_project,
    onSave: () => {
      setSaved(true);
    }
  }, [sampleSettings, saved]);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onDeleteSample={() => onDelete_Sample()}
        />
      }
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingHorizontal: 5,
          paddingBottom: Dimensions.get('screen').height - 240,
        }}
      >
        <Layout.PseudoWidget
          saved={saved}
          theme={theme}
        >
          <View
            style={{
              gap: 15,
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
              style={{ gap: 20 }}
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
                    label: R['Reference Coordinates'],
                    value: sampleSettings.gps,
                    type: 'gps',
                    lockedLabel: true,
                    lockedData: !sampleSettings.rules.allowGPSChange,
                  }}
                  referenceGPSData={undefined}
                  automaticGPSAcquisition={config.automaticSampleGPSReference}
                  onSave={(inputData) => onSaveGPS(inputData)}
                  theme={theme}
                  {...unusedProps}
                />
              )}
            </View>
          </View>
        </Layout.PseudoWidget>
      </Layout.ScrollView>
    </Layout.Screen>
  );
});

/**
 * sampleSettings data processing before saving.
 * Each time a new data comes before a 200ms interval, it discards the old data to save the updated
 * version.
 */
function useAutosave_sample(o: {
  id_project: string;
  onSave: () => void
}, deps: [SampleSettings, boolean]) {

  const { id_project } = o;
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
        o.onSave();
      },
      onError: (erroMessage) => alert(erroMessage),
    });

  }, [sampleSettings], 200);
}
