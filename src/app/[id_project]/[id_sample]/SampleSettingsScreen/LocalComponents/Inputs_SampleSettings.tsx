import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { useTiming } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function Inputs_SampleSettings() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);
  const sampleSettings = useMemo(() => ProjectService.getSampleFromCache(id_sample), []);
  const { rules } = useMemo(() => sampleSettings, []);

  const [name, setName] = useState<string>(sampleSettings.name);
  const [saved, setSaved] = useState<boolean>(true);

  useTiming(async () => {
    if (!saved) {
      sampleSettings.name = name;
      await ProjectService.updateSample(
        id_project,
        sampleSettings,
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
          backgroundColor: theme.secondary,
          height: 40,
          padding: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
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
          value={name}
          onChangeText={(text) => onNameChange(text)}
        />
      </Layout.View>
    </Layout.View>
  );
}
