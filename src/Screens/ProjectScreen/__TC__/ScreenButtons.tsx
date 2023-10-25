import React, { memo, useCallback, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import AlertService from '@Services/AlertService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import CameraService from '@Services/CameraService';
import DatabaseService from '@Services/DatabaseService';

export const ScreenButtons = memo((props: {
  onSampleCreation: () => void
}) => {

  const id_project      = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);

  const createSample = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'sample creation',
      id_project: id_project,
    }, () => props.onSampleCreation());
  }, [props.onSampleCreation, id_project]);

  const uploadProject = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'upload projects',
      id_project: id_project,
    }, () => {});
  }, []);

  const showCamera = useCallback(async () => {
    await CameraService.handleCamera({
      id_project: id_project,
      mode: 'photo',
    }, async (id_photo) => {
      console.log(id_photo);
      console.log(await DatabaseService.getAllPicturesIDs(id_project));
    });
  }, []);

  return (
    <Layout.ScreenButtons

      buttons={<>
        <Button.RoundedIcon
          iconName="camera"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={async () => await showCamera()}
          theme={{
            font: theme.font,
            font_Pressed: theme.backgroud,
            background: theme.backgroud,
            background_Pressed: theme.background_active,
          }}
        />
        <Button.RoundedIcon
          iconName="home"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('HOME SCOPE')}
          theme={{
            font: theme.font,
            font_Pressed: theme.backgroud,
            background: theme.backgroud,
            background_Pressed: theme.background_active,
          }}
        />
        <Button.RoundedIcon
          iconName="cloud-upload"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={async () => await uploadProject()}
          theme={{
            font: theme.font,
            font_Pressed: theme.backgroud,
            background: theme.backgroud,
            background_Pressed: theme.background_active,
          }}
        />
        {projectSettings.rules.showSampleCreationButton && (
          <Button.RoundedIcon
            iconName="clipboard"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={async () => await createSample()}
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
