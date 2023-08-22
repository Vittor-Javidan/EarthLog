import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { useTiming } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

export default function Inputs_ProjectSettings() {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);
  const { rules } = useMemo(() => projectSettings, []);

  const [name, setName] = useState<string>(projectSettings.name);
  const [saved, setSaved] = useState<boolean>(true);

  useTiming(async () => {
    if (!saved) {
      projectSettings.name = name;
      await ProjectService.updateProject(
        projectSettings,
        () => setSaved(true),
        (erroMessage) => alert(erroMessage)
      );
    }
  }, [saved], 100);

  function onNameChange(newName: string) {
    if (rules.allowNameChange) {
      setName(newName);
      setSaved(false);
    }
  }

  return (
    <Layout.View>
      <Layout.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.secondary,
          height: 40,
          padding: 5,
          paddingHorizontal: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Layout.StatusFeedback
          done={saved}
          error={false}
        />
        <Layout.Text.P
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            color: theme.onSecondary,
          }}
        >
          {stringResources['Project info']}
        </Layout.Text.P>
      </Layout.View>
      <Layout.View
        style={{
          backgroundColor: theme.tertiary,
          padding: 5,
          paddingBottom: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          gap: 10,
        }}
      >
        <Layout.Input.String
          label={stringResources['ID']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder=""
          value={projectSettings.id_project}
          locked={true}
          onChangeText={() => {}}
        />
        <Layout.Input.String
          label={stringResources['Name']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={stringResources['Write the project name here...']}
          value={name}
          locked={!rules.allowNameChange}
          onChangeText={(text) => onNameChange(text)}
        />
      </Layout.View>
    </Layout.View>
  );
}
