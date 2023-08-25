import React, { useMemo } from 'react';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export default function Drawer() {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.HomeScreen[language], []);

  return (
    <Layout.Button.TextWithIcon
      title={stringResources['Settings']}
      iconName="settings"
      iconSide="Right"
      color_background={theme.tertiary}
      color_font={theme.onTertiary}
      onPress={() => navigate('SETTINGS SCREEN')}
    />
  );
}
