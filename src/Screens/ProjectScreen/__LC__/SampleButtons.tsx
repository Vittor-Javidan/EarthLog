import React, { memo, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { SampleSettings } from '@Types/ProjectTypes';

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
        font: theme.font_Button,
        font_Pressed: theme.font_active,
        background: theme.background_Button,
        background_Pressed: theme.background_active,
      }}
    />
  ));

  return (<>{AllSamples}</>);
});
