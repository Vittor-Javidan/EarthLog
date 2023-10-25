import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export function F_SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  const AllButtons = CacheService.allSamples.map(sampleSettings => (
    <Button.TextWithIcon
      key={sampleSettings.id_sample}
      title={sampleSettings.name}
      iconName="clipboard"
      onPress={() => navigate('SAMPLE SCOPE', id_project, sampleSettings.id_sample)}
      theme={{
        font: theme.font_Button,
        font_Pressed: theme.font_active,
        background: theme.background_Button,
        background_Pressed: theme.background_active,
      }}
    />
  ));

  return (
    <Layout.ScrollView
      contentContainerStyle={{
        paddingTop: 55,
        paddingBottom: 150,
        gap: 1,
      }}
    >
      {AllButtons}
    </Layout.ScrollView>
  );
}
