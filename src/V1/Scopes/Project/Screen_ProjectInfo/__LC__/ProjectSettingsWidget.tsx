import React, { useState, useMemo, useCallback, memo } from 'react';
import { View } from 'react-native';

import { deepCopy } from '@V1/Globals/DeepCopy';
import { GPSInputData, ProjectSettings, StringInputData } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import { useTimeout } from '@V1/Hooks/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ProjectService } from '@V1/Services/ProjectService';
import { ConfigService } from '@V1/Services/ConfigService';
import { CacheService } from '@V1/Services/CacheService';

import { Text } from '@V1/Text/index';
import { Layout } from '@V1/Layout/index';
import { WidgetInput } from '@V1/WidgetInput/index';

export const ProjectSettingsWidget = memo((props: {
  projectSettings: ProjectSettings
  onProjectNameUpdate: (newName: string) => void
  onSampleAliasChange_Plural: (newAliasName: string) => void
  onSampleAliasChange_Singular: (newAliasName: string) => void
}) => {

  const config         = useMemo(() => ConfigService.config, []);
  const theme          = useMemo(() => ThemeService.widgetThemes[config.widgetTheme], []);
  const R              = useMemo(() => translations.screen.projectInfo[config.language], []);
  const unusedProps    = useMemo(() => ({
    editWidget:     false,
    isFirstInput:   false,
    isLastInput:    false,
    onInputDelete:  () => {},
    onInputMoveDow: () => {},
    onInputMoveUp:  () => {},
    widgetRules:    {},
  }), []);
  const [projectSettings, setProjectSettings] = useState<ProjectSettings>(deepCopy(props.projectSettings));
  const [saved,           setSaved          ] = useState<boolean>(true);

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
    props.onSampleAliasChange_Singular(inputData.value);
  }, [props.onSampleAliasChange_Singular]);

  const onSaveGPS = useCallback((inputData: GPSInputData) => {
    setSaved(false);
    setProjectSettings(prev => ({ ...prev, gps: inputData.value }));
  }, []);

  useAutoSave_project(() => {
    setSaved(true);
  }, [projectSettings, saved]);

  return (
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
          {R['Project info']}
        </Text>
        <View
          style={{ gap: 20 }}
        >
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
      </View>
      <View
        style={{
          paddingTop: 15,
          gap: 15,
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
        <View
          style={{ gap: 20 }}
        >
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

    await ProjectService.updateProject({
      projectSettings: projectSettings,
      sync: true,
      onSuccess: () => {
        CacheService.updateCache_ProjectSettings({ projectSettings });
        onSave();
      },
      onError: (erroMessage) => alert(erroMessage),
    });

  }, [projectSettings], 200);
}
