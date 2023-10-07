import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { GPSInputData, InputStatus, SampleSettings, StringInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';

import { Text } from '@Text/index';
import { Layout } from '@Layout/index';
import { WidgetInput } from '@WidgetInput/index';

export default function SampleSettingsWidget(props: {
  onSampleNameUpdate: (newName: string) => void
  onGPSReferenceUpdate: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample  = useLocalSearchParams().id_sample as string;
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.widgetThemes['light'], []);
  const R               = useMemo(() => translations.screen.sampleInfoScreen[config.language], []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);

  const [sampleSettings,  setSampleSettings ] = useState<SampleSettings>(UtilService.deepCopy(CacheService.getSampleFromCache(id_sample)));
  const [saved,           setSaved          ] = useState<boolean>(true);

  function onSaveName(inputData: StringInputData | null, status: InputStatus) {
    if (status === 'modifying') {
      setSaved(false);
      return;
    }
    if (inputData !== null && status === 'ready to save') {
      setSampleSettings(prev => {
        const newData: SampleSettings = { ...prev, name: inputData.value };
        save(newData, 'name update');
        return newData;
      });
    }
  }

  function onSaveGPS(gpsData: GPSInputData | null, status: InputStatus) {
    if (status === 'modifying') {
      setSaved(false);
      return;
    }
    if (gpsData !== null && status === 'ready to save') {
      setSampleSettings(prev => {
        const newData: SampleSettings = { ...prev, gps: gpsData.value };
        save(newData, 'gps update');
        return newData;
      });
      props.onGPSReferenceUpdate();
    }
  }

  async function save(sampleSettings: SampleSettings, type: 'name update' | 'gps update') {

    if (projectSettings.status === 'uploaded') {
      projectSettings.status = 'modified';
      await ProjectService.updateProject(
        projectSettings,
        () => CacheService.updateCache_ProjectSettings(projectSettings),
        (erroMessage) => alert(erroMessage)
      );
    }

    await ProjectService.updateSample(
      id_project,
      sampleSettings,
      () => {
        CacheService.updateCache_SampleSettings(sampleSettings);
        setSaved(true);
        switch (type) {
          case 'name update': props.onSampleNameUpdate(sampleSettings.name); break;
          case 'gps update': props.onGPSReferenceUpdate(); break;
        }
      },
      (erroMessage) => alert(erroMessage)
    );
  }

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
          multiline={false}
          editWidget={false}
          isFirstInput={false}
          isLastInput={false}
          onSave={() => {}}
          onInputDelete={() => {}}
          onInputMoveDow={() => {}}
          onInputMoveUp={() => {}}
          widgetRules={{}}
          theme={theme}
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
          onSave={(inputData, status) => onSaveName(inputData, status)}
          multiline={false}
          editWidget={false}
          isFirstInput={false}
          isLastInput={false}
          onInputDelete={() => {}}
          onInputMoveDow={() => {}}
          onInputMoveUp={() => {}}
          widgetRules={{}}
          theme={theme}
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
            onSave={(inputData, status) => onSaveGPS(inputData, status)}
            referenceGPSData={undefined}
            editWidget={false}
            isFirstInput={false}
            isLastInput={false}
            onInputDelete={() => {}}
            onInputMoveDow={() => {}}
            onInputMoveUp={() => {}}
            widgetRules={{}}
            theme={theme}
          />
        )}
      </View>
    </Layout.PseudoWidget>
  );
}
