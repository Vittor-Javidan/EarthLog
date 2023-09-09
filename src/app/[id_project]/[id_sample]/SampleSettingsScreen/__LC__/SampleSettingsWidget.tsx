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

type States_Inputs_SampleSettings = {
  sampleSettings: SampleSettings
  showGPS: boolean
  saved: boolean
}

export default function SampleSettingsWidget() {

  const id_sample = useLocalSearchParams().id_sample as string;
  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);

  const [state, setState] = useState<States_Inputs_SampleSettings>({
    sampleSettings: UtilService.deepCloning(CacheService.getSampleFromCache(id_sample)),
    showGPS: CacheService.getSampleFromCache(id_sample).gps !== undefined,
    saved: true,
  });

  useAutoSave(() => {
    setState(prev => ({ ...prev, saved: true }));
  }, [state]);

  async function onNameChange(newName: string) {
    if (state.sampleSettings.rules.allowNameChange) {
      setState(prev => ({
        ...prev,
        sampleSettings: { ...prev.sampleSettings, name: newName },
        saved: false,
      }));
    }
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    setState(prev => ({
      ...prev,
      sampleSettings: { ...prev.sampleSettings, gps: newGPSData },
      saved: false,
    }));
  }

  function createGPS() {
    setState(prev => ({
      ...prev,
      sampleSettings: { ...prev.sampleSettings, gps: {} },
      showGPS: true,
      saved: false,
    }));
  }

  function onDeleteGPS() {
    const { gps } = state.sampleSettings;
    if (gps !== undefined) {
      setState(prev => {
        delete prev.sampleSettings.gps;
        return {
          ...prev,
          showGPS: false,
          saved: false,
        };
      });
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
            {R['Sample info']}
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
          label={R['ID']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder=""
          locked={true}
          value={state.sampleSettings.id_sample}
          onChangeText={() => {}}
        />
        <Layout.Input.String
          label={R['Name']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={R['Write the sample name here...']}
          locked={!state.sampleSettings.rules.allowNameChange}
          value={state.sampleSettings.name}
          onChangeText={async (text) => await onNameChange(text)}
        />
        {state.showGPS && state.sampleSettings.gps !== undefined && (
          <Layout.Input.GPS
            label="GPS"
            gpsData={state.sampleSettings.gps}
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
  dependecyArray: [ States_Inputs_SampleSettings ],
) {

  const id_project = useLocalSearchParams().id_project as string;
  const { sampleSettings, saved } = dependecyArray[0];

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
