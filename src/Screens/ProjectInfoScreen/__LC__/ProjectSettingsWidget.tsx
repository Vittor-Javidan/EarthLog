import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { GPSInputData, InputStatus, ProjectSettings, StringInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import UtilService from '@Services/UtilService';

import { Text } from '@Text/index';
import { Layout } from '@Layout/index';
import { WidgetInput } from '@WidgetInput/index';

export default function ProjectSettingsWidget(props: {
  onProjectNameUpdate: (newName: string) => void
  onSampleAliasChange: (newSampleAlias: string) => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.Screens.ProjectSettingsScreen[config.language], []);

  const [projectSettings, setProjectSettings] = useState<ProjectSettings>(UtilService.deepCopy(CacheService.getProjectFromCache(id_project)));
  const [saved,           setSaved          ] = useState<boolean>(true);

  const pseudoWidgetTheme = ThemeService.widgetThemes['default'];

  function onSaveName(inputData: StringInputData | null, status: InputStatus) {
    if (status === 'modifying') {
      setSaved(false);
      return;
    }
    if (inputData !== null && status === 'ready to save') {
      setProjectSettings(prev => {
        const newData: ProjectSettings = { ...prev, name: inputData.value };
        props.onProjectNameUpdate(inputData.value);
        save(newData);
        return newData;
      });
    }
  }

  function onSaveAlias_Singular(inputData: StringInputData | null, status: InputStatus) {
    if (status === 'modifying') {
      setSaved(false);
      return;
    }
    if (inputData !== null && status === 'ready to save') {
      setProjectSettings(prev => {
        const newData: ProjectSettings = { ...prev, sampleAlias: { ...prev.sampleAlias, singular: inputData.value }};
        save(newData);
        return newData;
      });
    }
  }

  function onSaveAlias_Plural(inputData: StringInputData | null, status: InputStatus) {
    if (status === 'modifying') {
      setSaved(false);
      return;
    }
    if (inputData !== null && status === 'ready to save') {
      setProjectSettings(prev => {
        const newData: ProjectSettings = { ...prev, sampleAlias: { ...prev.sampleAlias, plural: inputData.value }};
        props.onSampleAliasChange(inputData.value);
        save(newData);
        return newData;
      });
    }
  }

  function onSaveGPS(inputData: GPSInputData | null, status: InputStatus) {
    if (status === 'modifying') {
      setSaved(false);
      return;
    }
    if (inputData !== null && status === 'ready to save') {
      setProjectSettings(prev => {
        const newData: ProjectSettings = { ...prev, gps: inputData.value };
        save(newData);
        return newData;
      });
    }
  }

  function save(projectSettings: ProjectSettings) {
    ProjectService.updateProject(
      projectSettings,
      () => {
        CacheService.updateCache_ProjectSettings(projectSettings);
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
      <View
        style={{
          paddingBottom: 5,
          gap: 5,
        }}
      >
        <Text.H2
          style={{
            textAlign: 'center',
            color: pseudoWidgetTheme.font,
            paddingHorizontal: 5,
            marginBottom: -10,
          }}
        >
          {R['Project info']}
        </Text.H2>
        <WidgetInput.String
          inputData={{
            id_input: '',
            label: R['ID'],
            value: projectSettings.id_project,
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
            value: projectSettings.name,
            type: 'string',
            placeholder: R['Write the project name here...'],
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
        {projectSettings.gps !== undefined && (
          <WidgetInput.GPS
            inputData={{
              id_input: '',
              label: 'GPS',
              value: projectSettings.gps,
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
      </View>
      <View
        style={{
          paddingTop: 10,
          gap: 5,
        }}
      >
        <Text.H2
          style={{
            textAlign: 'center',
            color: pseudoWidgetTheme.font,
            paddingHorizontal: 5,
            paddingTop: 10,
            marginBottom: -10,
          }}
        >
          {'Sample Alias'}
        </Text.H2>
        <WidgetInput.String
          inputData={{
            id_input: '',
            label: 'Singular',
            value: projectSettings.sampleAlias.singular,
            type: 'string',
            placeholder: 'Write your sample alias here',
            lockedLabel: true,
            lockedData: false,
          }}
          onSave={(inputData, status) => onSaveAlias_Singular(inputData, status)}
          multiline={false}
          editWidget={false}
          isFirstInput={false}
          isLastInput={false}
          onInputDelete={() => {}}
          onInputMoveDow={() => {}}
          onInputMoveUp={() => {}}
          theme={pseudoWidgetTheme}
        />
        <WidgetInput.String
          inputData={{
            id_input: '',
            label: 'Plural',
            value: projectSettings.sampleAlias.plural,
            type: 'string',
            placeholder: 'Write your sample alias here',
            lockedLabel: true,
            lockedData: false,
          }}
          onSave={(inputData, status) => onSaveAlias_Plural(inputData, status)}
          multiline={false}
          editWidget={false}
          isFirstInput={false}
          isLastInput={false}
          onInputDelete={() => {}}
          onInputMoveDow={() => {}}
          onInputMoveUp={() => {}}
          theme={pseudoWidgetTheme}
        />
      </View>
    </Layout.PseudoWidget>
  );
}
