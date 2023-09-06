import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { translations } from '@Translations/index';
import { GPS_DTO, SampleSettings } from '@Types/index';
import { useTimeout } from '@Hooks/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import UtilService from '@Services/UtilService';

export default function Inputs_SampleSettings() {

  const id_sample = useLocalSearchParams().id_sample as string;

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);

  const [sampleSettings, setSampleSettings] = useState<SampleSettings>(UtilService.deepCloning(CacheService.getSampleFromCache(id_sample)));
  const [showGPS, setShowGPS] = useState<boolean>(sampleSettings.gps !== undefined);
  const [saved, setSaved] = useState<boolean>(true);
  const { rules } = sampleSettings;

  useAutoSave(() => {
    setSaved(true);
  }, [sampleSettings], saved);

  async function onNameChange(newName: string) {
    if (sampleSettings.rules.allowNameChange) {
      setSampleSettings(prev => {
        const newData = { ...prev };
        newData.name = newName;
        return newData;
      });
      setSaved(false);
    }
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    setSampleSettings(prev => ({ ...prev, gps: newGPSData }));
    setSaved(false);
  }

  function onDeleteGPS() {
    if (sampleSettings.gps !== undefined) {
      const newProjectSettings = { ...sampleSettings };
      delete newProjectSettings.gps;
      setSampleSettings(newProjectSettings);
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
            {stringResources['Sample info']}
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
          locked={true}
          value={sampleSettings.id_sample}
          onChangeText={() => {}}
        />
        <Layout.Input.String
          label={stringResources['Name']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={stringResources['Write the sample name here...']}
          locked={!rules.allowNameChange}
          value={sampleSettings.name}
          onChangeText={async (text) => await onNameChange(text)}
        />
        {showGPS && (
          <Layout.Input.GPS
            label="GPS"
            initialGPSData={sampleSettings.gps ?? {}}
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
  dependencyArray: [ SampleSettings ],
  saved: boolean,
) {

  const id_project = useLocalSearchParams().id_project as string;

  useTimeout(async () => {
    if (!saved) {
      await ProjectService.updateSample(
        id_project,
        dependencyArray[0],
        () => {
          CacheService.updateCache_SampleSettings(dependencyArray[0]);
          onSucces();
        },
        (erroMessage) => alert(erroMessage)
      );
    }
  }, dependencyArray, 200);
}
