import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export default function Drawer() {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectScreen[language], []);

  return (<>
    <Layout.Button.TextWithIcon
      title={stringResources['Edit project']}
      iconName="pencil-sharp"
      iconSide="Right"
      color_background={theme.tertiary}
      color_font={theme.onTertiary}
      onPress={() => navigate('PROJECT SETTINGS SCREEN', id_project)}
    />
    <Layout.Button.TextWithIcon
      title={stringResources['Edit template']}
      iconName="layers"
      iconSide="Right"
      color_background={theme.tertiary}
      color_font={theme.onTertiary}
      onPress={() => navigate('TEMPLATE SCREEN', id_project)}
    />
  </>);
}
