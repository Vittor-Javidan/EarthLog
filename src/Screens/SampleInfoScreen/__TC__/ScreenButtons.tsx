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
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);

  const [show_DeleteSwap, setShow_DeleteSwap] = useState<boolean>(false);



  const onDelete_Sample = useCallback(async () => {

    const projectSettings = CacheService.getProjectFromCache(id_project);
    if (projectSettings.status !== 'new') {

      // Project widget deletion entry ======
      projectSettings.deleted_Samples ??= [];
      projectSettings.deleted_Samples.push(id_sample);

      // Project status update ===================
      if (projectSettings.status === 'uploaded') {
        projectSettings.status = 'modified';
      }

      // Project settings update ========================
      await ProjectService.updateProject(projectSettings,
        () => CacheService.updateCache_ProjectSettings(projectSettings),
        (erroMessage) => alert(erroMessage)
      );
    }

    // Sample deletion =====================================
    await ProjectService.deleteSample(id_project, id_sample,
      () => CacheService.removeFromSamples(id_sample),
      (errorMessage) => alert(errorMessage)
    );

    navigate('PROJECT SCOPE', id_project);

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
