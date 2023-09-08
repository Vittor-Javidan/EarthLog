import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { GPS_DTO, ProjectSettings } from '@Types/index';
import { useTimeout } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import UtilService from '@Services/UtilService';

import { Layout } from '@Components/Layout';

type States_Inputs_ProjectSettings = {
  projectSettings: ProjectSettings
  showGPS: boolean
  saved: boolean
}

export default function ProjectSettingsWidget() {

  const id_project = useLocalSearchParams().id_project as string;
  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);

  const [state, setState] = useState<States_Inputs_ProjectSettings>({
    projectSettings: UtilService.deepCloning(CacheService.getProjectFromCache(id_project)),
    showGPS: CacheService.getProjectFromCache(id_project).gps !== undefined,
    saved: true,
  });

  useAutoSave(() => {
    setState(prev => ({ ...prev, saved: true }));
  }, [state]);

  function onNameChange(newName: string) {
    if (state.projectSettings.rules.allowNameChange) {
      setState(prev => ({
        ...prev,
        projectSettings: { ...prev.projectSettings, name: newName },
        saved: false,
      }));
    }
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    setState(prev => ({
      ...prev,
      projectSettings: { ...prev.projectSettings, gps: newGPSData },
      saved: false,
    }));
  }

  function createGPS() {
    setState(prev => ({
      ...prev,
      projectSettings: { ...prev.projectSettings, gps: {} },
      showGPS: true,
      saved: false,
    }));
  }

  function onDeleteGPS() {
    const { gps } = state.projectSettings;
    if (gps !== undefined) {
      const newProjectSettings = { ...state.projectSettings };
      delete newProjectSettings.gps;
      setState(prev => ({
        ...prev,
        projectSettings: newProjectSettings,
        showGPS: false,
        saved: false,
      }));
    }
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
            done={state.saved}
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
        {!state.showGPS && (
          <Layout.Button.Icon
            iconName="location"
            color_background={theme.secondary}
            color={theme.onSecondary}
            onPress={() => createGPS()}
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
          value={state.projectSettings.id_project}
          locked={true}
          onChangeText={() => {}}
        />
        <Layout.Input.String
          label={stringResources['Name']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={stringResources['Write the project name here...']}
          value={state.projectSettings.name}
          locked={!state.projectSettings.rules.allowNameChange}
          onChangeText={(text) => onNameChange(text)}
        />
        {state.showGPS && state.projectSettings.gps !== undefined && (
          <Layout.Input.GPS
            label="GPS"
            gpsData={state.projectSettings.gps}
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
  dependecyArray: [ States_Inputs_ProjectSettings ],
) {

  const { projectSettings, saved } = dependecyArray[0];

  useTimeout(async () => {
    if (!saved) {
      await ProjectService.updateProject(
        projectSettings,
        () => {
          CacheService.updateCache_ProjectSettings(projectSettings);
          onSucces();
        },
        (erroMessage) => alert(erroMessage)
      );
    }
  }, dependecyArray, 200);
}
