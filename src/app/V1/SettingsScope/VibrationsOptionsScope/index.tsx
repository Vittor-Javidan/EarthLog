import React, { useMemo } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import ConfigService from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { VibrationOptionsScreen } from '@V1/Screens/VibrationOptionsScreen';
import { NavigationTree } from './NavigationTree';

export default function VibrationsOptionsScope() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.vibrationOptions[config.language], []);

  useBackPress(() => navigate('SETTINGS SCOPE'), []);

  return (
    <Layout.Root
      title={R['Vibration']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <VibrationOptionsScreen />
    </Layout.Root>
  );
}
