import React, { useMemo } from 'react';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export default function Drawer() {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.HomeScreen[language], []);

  return (
    <Layout.Button.TextWithIcon
      title={R['Settings']}
      iconName="settings"
      iconSide="Right"
      color_background={theme.tertiary}
      color_font={theme.onTertiary}
      onPress={() => navigate('SETTINGS SCREEN')}
    />
  );
}
