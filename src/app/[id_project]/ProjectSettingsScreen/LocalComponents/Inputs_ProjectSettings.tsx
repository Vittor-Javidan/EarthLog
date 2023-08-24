import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { useTimeout } from '@Hooks/index';
import { translations } from '@Translations/index';
import { ProjectSettings } from '@Types/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import UtilService from '@Services/UtilService';

export default function Inputs_ProjectSettings() {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);

  const [projectSettings, setProjectSettings] = useState<ProjectSettings>(UtilService.deepCloning(CacheService.getProjectFromCache(id_project)));
  const [saved, setSaved] = useState<boolean>(true);
  const { rules } = projectSettings;

  useTimeout(async () => {
    if (!saved) {
      await ProjectService.updateProject(
        projectSettings,
        () => {
          for (let i = 0; i < CacheService.allProjects.length; i++) {
            if (CacheService.allProjects[i].id_project === projectSettings.id_project) {
              CacheService.allProjects[i] = UtilService.deepCloning(projectSettings);
            }
          }
          setSaved(true);
        },
        (erroMessage) => alert(erroMessage)
      );
    }
  }, [projectSettings], 200);

  function onNameChange(newName: string) {
    if (rules.allowNameChange) {
      setProjectSettings(prev => {
        const newData = { ...prev};
        newData.name = newName;
        return newData;
      });
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
          value={projectSettings.name}
          locked={!rules.allowNameChange}
          onChangeText={(text) => onNameChange(text)}
        />
      </Layout.View>
    </Layout.View>
  );
}
