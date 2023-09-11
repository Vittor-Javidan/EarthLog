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

export default function ProjectSettingsWidget() {

  const id_project = useLocalSearchParams().id_project as string;
  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);

  const [projectSettings, setProjectSettings] = useState<ProjectSettings>(UtilService.deepCopy(CacheService.getProjectFromCache(id_project)));
  const [showGPS,         setShowGPS        ] = useState<boolean>(CacheService.getProjectFromCache(id_project).gps !== undefined);
  const [saved,           setSaved          ] = useState<boolean>(true);

  useAutoSave(() => {
    setSaved(true);
  }, [projectSettings, saved]);

  function onNameChange(newName: string) {
    if (projectSettings.rules.allowNameChange) {
      setProjectSettings(prev => ({ ...prev, name: newName }));
      setSaved(false);
    }
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    setProjectSettings(prev => ({ ...prev, gps: newGPSData }));
    setSaved(false);
  }

  function createGPS() {
    setProjectSettings(prev => ({ ...prev, gps: {} }));
    setShowGPS(true);
    setSaved(false);
  }

  function onDeleteGPS() {
    const { gps } = projectSettings;
    if (gps !== undefined) {
      setProjectSettings(prev => {
        delete prev.gps;
        return { ...prev };
      });
      setShowGPS(false);
      setSaved(false);
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
          minHeight: 40,
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
            {R['Project info']}
          </Layout.Text.P>
        </Layout.View>
        {!showGPS && (
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
          label={R['ID']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder=""
          value={projectSettings.id_project}
          locked={true}
          onChangeText={() => {}}
        />
        <Layout.Input.String
          label={R['Name']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={R['Write the project name here...']}
          value={projectSettings.name}
          locked={!projectSettings.rules.allowNameChange}
          onChangeText={(text) => onNameChange(text)}
        />
        {showGPS && projectSettings.gps !== undefined && (
          <Layout.Input.GPS
            label="GPS"
            gpsData={projectSettings.gps}
            backgroundColor={theme.tertiary}
            color={theme.onTertiary}
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
  dependecyArray: [ ProjectSettings, boolean ],
) {

  const [projectSettings, saved] = dependecyArray;

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
