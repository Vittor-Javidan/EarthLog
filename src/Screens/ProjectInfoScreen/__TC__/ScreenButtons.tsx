import React, { useState, useMemo, memo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export const ScreenButtons = memo((props: {
  onCreateWidget: () => void
  onDeleteProject: () => void
}) => {

  const id_project = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project, config), []);
  const [show_DeleteSwap, setShow_DeleteSwap] = useState<boolean>(false);

  return (
    <Layout.ScreenButtons
      buttons={
        <>
          <Button.RoundedIcon
            iconName="trash-outline"
            showPlusSign={false}
            buttonDiameter={60}
            onPress={() => setShow_DeleteSwap(true)}
            theme={{
              font: theme.font,
              font_Pressed: theme.wrong,
              background: theme.wrong,
              background_Pressed: theme.background_active,
            }}
          />
          {projectSettings.rules.showCreateWidgetButton_Project && (
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
        </>
      }

      showSwipe={show_DeleteSwap}
      SwipeButton={
        <Button.ConfirmSwipe
          onSwipe={props.onDeleteProject}
          onCancel={() => setShow_DeleteSwap(false)}
          buttonRadius={30}
          theme={{
            font: theme.confirm,
            background: theme.background_active,
            confirm: theme.confirm,
            wrong: theme.wrong,
          }}
        />
      }
    />
  );
});
