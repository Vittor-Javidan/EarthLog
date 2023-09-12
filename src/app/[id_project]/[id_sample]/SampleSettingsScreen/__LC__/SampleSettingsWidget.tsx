import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { GPS_DTO, SampleSettings } from '@Types/index';
import { translations } from '@Translations/index';
import { useTimeout } from '@Hooks/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import UtilService from '@Services/UtilService';

import { Layout } from '@Components/Layout';

export default function SampleSettingsWidget() {

  const id_sample = useLocalSearchParams().id_sample as string;
  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);

  const [sampleSettings,  setSampleSettings ] = useState<SampleSettings>(UtilService.deepCopy(CacheService.getSampleFromCache(id_sample)));
  const [showGPS,         setShowGPS        ] = useState<boolean>(CacheService.getSampleFromCache(id_sample).gps !== undefined);
  const [saved,           setSaved          ] = useState<boolean>(true);

  useAutoSave(() => {
    setSaved(true);
  }, [sampleSettings, saved]);

  async function onNameChange(newName: string) {
    if (sampleSettings.rules.allowNameChange) {
      setSampleSettings(prev => ({ ...prev, name: newName }));
      setSaved(false);
    }
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    setSampleSettings(prev => ({ ...prev, gps: newGPSData }));
    setSaved(false);
  }

  function createGPS() {
    setSampleSettings(prev => ({ ...prev, gps: {} }));
    setShowGPS(true);
    setSaved(false);
  }

  function onDeleteGPS() {
    const { gps } = sampleSettings;
    if (gps !== undefined) {
      setSampleSettings(prev => {
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
            {R['Sample info']}
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
          locked={true}
          value={sampleSettings.id_sample}
          onChangeText={() => {}}
        />
        <Layout.Input.String
          label={R['Name']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={R['Write the sample name here...']}
          locked={!sampleSettings.rules.allowNameChange}
          value={sampleSettings.name}
          onChangeText={async (text) => await onNameChange(text)}
        />
        {showGPS && sampleSettings.gps !== undefined && (
          <Layout.Input.GPS
            label="GPS"
            gpsData={sampleSettings.gps}
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
  dependecyArray: [ SampleSettings, boolean ],
) {

  const id_project = useLocalSearchParams().id_project as string;
  const [sampleSettings, saved] = dependecyArray;

  useTimeout(async () => {
    if (!saved) {
      await ProjectService.updateSample(
        id_project,
        sampleSettings,
        () => {
          CacheService.updateCache_SampleSettings(sampleSettings);
          onSucces();
        },
        (erroMessage) => alert(erroMessage)
      );
    }
  }, dependecyArray, 200);
}
