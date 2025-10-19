import React, { useMemo } from 'react';

import { navigate } from '@V2/Globals/NavigationControler';
import { translations } from '@V2/Translations/index';
import { useBackPress } from '@V2/Hooks/index';
import ConfigService from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
import { VibrationOptionsScreen } from '@V2/Screens/VibrationOptionsScreen';

import NavigationTree from './NavigationTree';

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
