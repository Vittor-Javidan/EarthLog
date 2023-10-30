import React, { useState, useMemo, memo, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';

import { Layout } from '@Layout/index';
import { Button } from '@Button/index';

export const ScreenButtons = memo(() => {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample  = useLocalSearchParams().id_sample as string;
  const config         = useMemo(() => ConfigService.config, []);
  const theme          = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample, config), []);

  const [show_DeleteSwap, setShow_DeleteSwap] = useState<boolean>(false);

  const onDelete_Sample = useCallback(async () => {
    await ProjectService.deleteSample({
      id_project: id_project,
      sampleSettings: sampleSettings,
      sync: true,
    }, async () => {
      await ProjectService.deleteMedia_Sample(id_project, CacheService.allWidgets_Sample);
      CacheService.removeFromSamples(id_sample);
      navigate('PROJECT SCOPE', id_project);
    }, (errorMessage) => alert(errorMessage));
  }, [id_project, id_sample]);

  return (
    <Layout.ScreenButtons

      buttons={
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
      }

      showSwipe={show_DeleteSwap}
      SwipeButton={
        <Button.ConfirmSwipe
          onSwipe={async () => await onDelete_Sample()}
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
