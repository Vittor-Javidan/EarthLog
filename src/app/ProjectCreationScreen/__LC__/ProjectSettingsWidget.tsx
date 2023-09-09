import React, { useState, useMemo } from 'react';

import { GPS_DTO } from '@Types/index';
import { translations } from '@Translations/index';
import UtilService from '@Services/UtilService';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Components/Layout';
import { API } from '../__API__';

export default function ProjectSettingsWidget() {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectCreationScreen[language], []);

  const [id, setId] = useState<string>(API.TemporaryProject.project.projectSettings.id_project);
  const [name, setName] = useState<string>(API.TemporaryProject.project.projectSettings.name);
  const [gpsData, setGPSData] = useState<GPS_DTO | undefined>(API.TemporaryProject.project.projectSettings.gps);
  const [showGPS, setShowGPS] = useState<boolean>(false);

  function onIDChange(newID: string) {
    const normalizedText = newID.replace(UtilService.idRegex, '');
    API.ProjectSettingsWidget.setID(normalizedText);
    setId(normalizedText);
  }

  function onNameChange(newName: string) {
    API.ProjectSettingsWidget.setName(newName);
    setName(newName);
  }

  function onSaveGPS(gpsData: GPS_DTO) {
    API.ProjectSettingsWidget.setGPS(UtilService.deepCloning(gpsData));
    setGPSData(UtilService.deepCloning(gpsData));
  }

  function onDeleteGPS() {
    API.ProjectSettingsWidget.deleteGPS();
    setGPSData(undefined);
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
        <Layout.Text.P
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            color: theme.onSecondary,
          }}
        >
          {stringResources['Project info']}
        </Layout.Text.P>
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
          placeholder={stringResources['Only numbers, letters and "-".']}
          value={id}
          locked={false}
          onChangeText={(text) => onIDChange(text)}
        />
        <Layout.Input.String
          label={stringResources['Name']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={stringResources['Write the project name here...']}
          value={name}
          locked={false}
          onChangeText={(text) => onNameChange(text)}
        />
        {showGPS && (
          <Layout.Input.GPS
            label="GPS"
            gpsData={gpsData ?? {}}
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
