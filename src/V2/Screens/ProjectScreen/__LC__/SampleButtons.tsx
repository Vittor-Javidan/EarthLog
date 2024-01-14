import React, { memo, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V2/Globals/NavigationControler';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Button } from '@V2/Button/index';
import { SampleSettings } from '@V2/Types/ProjectTypes';

export const SampleButtons = memo((props: {
  samples: SampleSettings[]
}) => {

  const id_project = useLocalSearchParams().id_project as string;
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  const AllSamples = props.samples.map(sampleSettings => (
    <Button.TextWithIcon
      key={sampleSettings.id_sample}
      title={sampleSettings.name}
      iconName="clipboard"
      onPress={() => navigate('SAMPLE SCOPE', id_project, sampleSettings.id_sample)}
      theme={{
        font:              theme.font_Button,
        font_active:       theme.font_active,
        background:        theme.background_Button,
        background_active: theme.background_active,
      }}
    />
  ));

  return (<>{AllSamples}</>);
});
