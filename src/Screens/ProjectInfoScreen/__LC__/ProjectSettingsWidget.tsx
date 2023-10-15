import React, { useState, useMemo, useCallback, memo } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { GPSInputData, ProjectSettings, StringInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import { useTimeout } from '@Hooks/index';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';
import UtilService from '@Services/UtilService';
import ProjectService from '@Services/ProjectService';
import SyncService from '@Services/SyncService';

import { Text } from '@Text/index';
import { Layout } from '@Layout/index';
import { WidgetInput } from '@WidgetInput/index';

export const ProjectSettingsWidget = memo((props: {
  onProjectNameUpdate: (newName: string) => void
  onSampleAliasChange_Plural: (newSampleAlias: string) => void
}) => {

  const id_project  = useLocalSearchParams().id_project as string;
  const config      = useMemo(() => ConfigService.config, []);
  const theme       = useMemo(() => ThemeService.widgetThemes[config.widgetTheme], []);
  const R           = useMemo(() => translations.screen.projectInfoScreen[config.language], []);
  const unusedProps = useMemo(() => ({
    editWidget:     false,
    isFirstInput:   false,
    isLastInput:    false,
    onInputDelete:  () => {},
    onInputMoveDow: () => {},
    onInputMoveUp:  () => {},
    widgetRules:    {},
  }), []);

  const [projectSettings, setProjectSettings] = useState<ProjectSettings>(UtilService.deepCopy(CacheService.getProjectFromCache(id_project)));
  const [saved,           setSaved          ] = useState<boolean>(true);

  useAutoSave_project(() => {
    setSaved(true);
  }, [projectSettings, saved]);

  const onSaveName = useCallback((inputData: StringInputData) => {
    setSaved(false);
    setProjectSettings(prev => ({ ...prev, name: inputData.value }));
    props.onProjectNameUpdate(inputData.value);
  }, [props.onProjectNameUpdate]);

  const onSaveAlias_Plural = useCallback((inputData: StringInputData) => {
    setSaved(false);
    setProjectSettings(prev => ({...prev, sampleAlias: {
      ...prev.sampleAlias,
      plural: inputData.value,
    }}));
    props.onSampleAliasChange_Plural(inputData.value);
  }, [props.onSampleAliasChange_Plural]);

  const onSaveAlias_Singular = useCallback((inputData: StringInputData) => {
    setSaved(false);
    setProjectSettings(prev => ({...prev, sampleAlias: {
      ...prev.sampleAlias,
      singular: inputData.value,
    }}));
  }, []);

  const onSaveGPS = useCallback((inputData: GPSInputData) => {
    setSaved(false);
    setProjectSettings(prev => ({ ...prev, gps: inputData.value }));
  }, []);

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
          {R['Project info']}
        </Text>
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
          onSave={() => {}}
          multiline={false}
          theme={theme}
          {...unusedProps}
        />
        <WidgetInput.String
          inputData={{
            id_input: '',
            label: R['Name'],
            value: projectSettings.name,
            type: 'string',
            placeholder: R['Write the project name here...'],
            lockedLabel: true,
            lockedData: !projectSettings.rules.allowProjectNameChange,
          }}
          onSave={(inputData) => onSaveName(inputData)}
          multiline={false}
          theme={theme}
          {...unusedProps}
        />
        {projectSettings.gps !== undefined && (
          <WidgetInput.GPS
            inputData={{
              id_input: '',
              label: 'GPS',
              value: projectSettings.gps,
              type: 'gps',
              lockedLabel: true,
              lockedData: !projectSettings.rules.allowGPSChange,
            }}
            onSave={(inputData) => onSaveGPS(inputData)}
            referenceGPSData={undefined}
            theme={theme}
            {...unusedProps}
          />
        )}
      </View>
      <View
        style={{
          paddingTop: 15,
          gap: 5,
        }}
      >
        <Text h2
          style={{
            textAlign: 'center',
            color: theme.font,
            paddingHorizontal: 5,
            paddingTop: 10,
          }}
        >
          {R['Sample Alias']}
        </Text>
        <WidgetInput.String
          inputData={{
            id_input: '',
            label: 'Singular',
            value: projectSettings.sampleAlias.singular,
            type: 'string',
            placeholder: R['Write your sample alias here'],
            lockedLabel: true,
            lockedData: !projectSettings.rules.allowSampleAliasChange,
          }}
          onSave={(inputData) => onSaveAlias_Singular(inputData)}
          multiline={false}
          theme={theme}
          {...unusedProps}
        />
        <WidgetInput.String
          inputData={{
            id_input: '',
            label: 'Plural',
            value: projectSettings.sampleAlias.plural,
            type: 'string',
            placeholder: R['Write your sample alias here'],
            lockedLabel: true,
            lockedData: !projectSettings.rules.allowSampleAliasChange,
          }}
          onSave={(inputData) => onSaveAlias_Plural(inputData)}
          multiline={false}
          theme={theme}
          {...unusedProps}
        />
      </View>
    </Layout.PseudoWidget>
  );
});

/**
 * projectSettings data processing before saving.
 * Each time a new data comes before a 200ms interval, it discards the old data to save the updated
 * version.
 */
function useAutoSave_project(onSave: () => void, deps: [ProjectSettings, boolean]) {

  const [projectSettings, saved] = deps;

  useTimeout(async () => {

    if (saved) {
      return;
    }

    await ProjectService.updateProject(projectSettings,
      async () => {
        CacheService.updateCache_ProjectSettings(projectSettings);
        await SyncService.syncData_Project(projectSettings.id_project);
        onSave();
      },
      (erroMessage) => alert(erroMessage)
    );

  }, [projectSettings], 200);
}
