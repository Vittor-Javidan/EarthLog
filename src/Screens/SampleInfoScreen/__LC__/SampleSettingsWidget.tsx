import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { GPSInputData, InputStatus, NewSampleSettings, StringInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Text } from '@Text/index';
import { Layout } from '@Layout/index';
import { WidgetInput } from '@WidgetInput/index';

export default function SampleSettingsWidget(props: {
  onSampleNameUpdate: (newName: string) => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;
  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);

  const [sampleSettings,  setSampleSettings ] = useState<NewSampleSettings>(UtilService.deepCopy(CacheService.getSampleFromCache(id_sample)));
  const [saved,           setSaved          ] = useState<boolean>(true);

  const pseudoWidgetTheme = {
    font:             theme.onPrimary,
    font_placeholder: theme.onPrimary_Placeholder,
    background:       theme.primary,
    confirm:          theme.confirm,
    wrong:            theme.wrong,
    modified:         theme.modified,
  };

  function onSaveName(inputData: StringInputData | null, status: InputStatus) {
    if (status === 'modifying') {
      setSaved(false);
      return;
    }
    if (inputData !== null && status === 'ready to save') {
      setSampleSettings(prev => {
        const newData: NewSampleSettings = { ...prev, name: inputData.value };
        props.onSampleNameUpdate(inputData.value);
        save(newData);
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
        const newData: NewSampleSettings = { ...prev, gps: gpsData.value };
        save(newData);
        return newData;
      });
    }
  }

  function save(sampleSettings: NewSampleSettings) {
    ProjectService.updateSample(
      id_project,
      sampleSettings,
      () => {
        CacheService.updateCache_SampleSettings(sampleSettings);
        setSaved(true);
      },
      (erroMessage) => alert(erroMessage)
    );
  }

  return (
    <Layout.PseudoWidget
      saved={saved}
      theme={pseudoWidgetTheme}
    >
      <Text.H2
        style={{
          textAlign: 'center',
          color: pseudoWidgetTheme.font,
          paddingHorizontal: 5,
          marginBottom: -10,
        }}
      >
        {R['Sample info']}
      </Text.H2>
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
        theme={pseudoWidgetTheme}
      />
      <WidgetInput.String
        inputData={{
          id_input: '',
          label: R['Name'],
          value: sampleSettings.name,
          type: 'string',
          placeholder: R['Write the sample name here...'],
          lockedLabel: true,
          lockedData: false,
        }}
        onSave={(inputData, status) => onSaveName(inputData, status)}
        multiline={false}
        editWidget={false}
        isFirstInput={false}
        isLastInput={false}
        onInputDelete={() => {}}
        onInputMoveDow={() => {}}
        onInputMoveUp={() => {}}
        theme={pseudoWidgetTheme}
      />
      {sampleSettings.gps !== undefined && (
        <WidgetInput.GPS
          inputData={{
            id_input: '',
            label: 'GPS',
            value: sampleSettings.gps,
            type: 'gps',
            lockedLabel: true,
            lockedData: false,
          }}
          onSave={(inputData, status) => onSaveGPS(inputData, status)}
          referenceGPSData={undefined}
          editWidget={false}
          isFirstInput={false}
          isLastInput={false}
          onInputDelete={() => {}}
          onInputMoveDow={() => {}}
          onInputMoveUp={() => {}}
          theme={pseudoWidgetTheme}
        />
      )}
    </Layout.PseudoWidget>
  );
}
