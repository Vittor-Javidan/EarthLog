import React, { memo, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export const ScreenButtons = memo((props: {
  onCreateWidget: () => void
  onCopyTemplateWidget: () => void
}) => {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample  = useLocalSearchParams().id_sample as string;
  const config         = useMemo(() => ConfigService.config, []);
  const theme          = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);

  return (
    <Layout.ScreenButtons
      buttons={<>
        <Button.RoundedIcon
          iconName="arrow-back"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('PROJECT SCOPE', id_project)}
          theme={{
            font: theme.font,
            font_Pressed: theme.backgroud,
            background: theme.backgroud,
            background_Pressed: theme.background_active,
          }}
        />
        {sampleSettings.rules.showCopyWidgetFromTemplateButton && (
          <Button.RoundedIcon
            iconName="copy"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={props.onCopyTemplateWidget}
            theme={{
              font: theme.font,
              font_Pressed: theme.confirm,
              background: theme.confirm,
              background_Pressed: theme.background_active,
            }}
          />
        )}
        {sampleSettings.rules.showCreateWidgetButton && (
          <Button.RoundedIcon
            iconName="square"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={props.onCreateWidget}
            theme={{
              font: theme.font,
              font_Pressed: theme.confirm,
              background: theme.confirm,
              background_Pressed: theme.background_active,
            }}
          />
        )}
      </>}
    />
  );
});
