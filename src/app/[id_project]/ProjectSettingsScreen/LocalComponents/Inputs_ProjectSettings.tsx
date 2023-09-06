import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { useTimeout } from '@Hooks/index';
import { translations } from '@Translations/index';
import { GPS_DTO, ProjectSettings } from '@Types/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import UtilService from '@Services/UtilService';

export default function Inputs_ProjectSettings() {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);

  const [projectSettings, setProjectSettings] = useState<ProjectSettings>(UtilService.deepCloning(CacheService.getProjectFromCache(id_project)));
  const [showGPS, setShowGPS] = useState<boolean>(projectSettings.gps !== undefined);
  const [saved, setSaved] = useState<boolean>(true);
  const { rules } = projectSettings;

  useAutoSave(() => {
    setSaved(true);
  }, [projectSettings], saved);

  function onNameChange(newName: string) {
    if (rules.allowNameChange) {
      setProjectSettings(prev => ({ ...prev, name: newName }));
      setSaved(false);
    }
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    setProjectSettings(prev => ({ ...prev, gps: newGPSData }));
    setSaved(false);
  }

  function onDeleteGPS() {
    if (projectSettings.gps !== undefined) {
      const newProjectSettings = { ...projectSettings };
      delete newProjectSettings.gps;
      setProjectSettings(newProjectSettings);
      setSaved(false);
    }
    setShowGPS(false);
  }

  return (
    <Layout.View>
      <Layout.View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme.secondary,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Layout.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10,
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
        {!showGPS && (
          <Layout.Button.Icon
            iconName="location"
            color_background={theme.secondary}
            color={theme.onSecondary}
            onPress={() => setShowGPS(true)}
            style={{
              height: 40,
              borderTopRightRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          />
        )}
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
        {showGPS && (
          <Layout.Input.GPS
            label="GPS"
            initialGPSData={projectSettings.gps ?? {}}
            backgroundColor={theme.tertiary}
            color={theme.onTertiary}
            color_placeholder={theme.onBackground_Placeholder}
            onPress_Delete={() => onDeleteGPS()}
            onPress_Save={(newGPSData) => onSaveGPS(newGPSData)}
          />
        )}
      </Layout.View>
    </Layout.View>
  );
}

function useAutoSave(
  onSucces: () => void,
  dependencyArray: [ ProjectSettings ],
  saved: boolean,
) {
  useTimeout(async () => {
    if (!saved) {
      await ProjectService.updateProject(
        dependencyArray[0],
        () => {
          CacheService.updateCache_ProjectSettings(dependencyArray[0]);
          onSucces();
        },
        (erroMessage) => alert(erroMessage)
      );
    }
  }, dependencyArray, 200);
}
