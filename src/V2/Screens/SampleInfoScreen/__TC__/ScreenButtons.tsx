import React, { useState, useMemo, memo, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V2/Globals/NavigationControler';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ProjectService } from '@V2/Services/ProjectService';
import { ConfigService } from '@V2/Services/ConfigService';
import { CacheService } from '@V2/Services/CacheService';
import { MediaService } from '@V2/Services/MediaService';

import { Layout } from '@V2/Layout/index';
import { Button } from '@V2/Button/index';

export const ScreenButtons = memo(() => {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample  = useLocalSearchParams().id_sample as string;
  const config         = useMemo(() => ConfigService.config, []);
  const theme          = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache({ id_sample }), []);

  const [show_DeleteSwap, setShow_DeleteSwap] = useState<boolean>(false);

  const onDelete_Sample = useCallback(async () => {
    await ProjectService.deleteSample({
      id_project: id_project,
      sampleSettings: sampleSettings,
      sync: true,
      onSuccess: async () => {
        await MediaService.deleteMediaRecursively({
          scope: 'sample',
          id_project: id_project,
          widgetArray: CacheService.allWidgets_Sample,
        });
        CacheService.removeFromSamples({ id_sample });
        navigate('PROJECT SCOPE', id_project);
      },
      onError: (errorMessage) => alert(errorMessage),
    });
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
            font:              theme.font,
            font_active:       theme.wrong,
            background:        theme.wrong,
            background_active: theme.background_active,
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
