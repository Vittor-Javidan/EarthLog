import React, { useMemo } from 'react';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';

export default function LastProjectButton() {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.HomeScreen[language], []);

  const { id_project } = CacheService?.lastOpenProject;
  const lastProjectOpenExist = id_project !== '';

  return lastProjectOpenExist ? (
    <Layout.View
      style={{
        backgroundColor: theme.secondary,
        paddingHorizontal: 2,
        paddingBottom: 2,
        borderRadius: 10,
      }}
    >
      <Layout.Text.H2
        style={{
          marginVertical: 5,
          marginLeft: 5,
          color: theme.onSecondary,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        {R['Recently Open']}
      </Layout.Text.H2>
      <Layout.Button.TextWithIcon
        iconName="folder"
        iconSide="Right"
        title={CacheService.lastOpenProject.name}
        color_background={theme.tertiary}
        color_font={theme.onTertiary}
        style={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        onPress={() => navigate('PROJECT SCREEN', id_project)}
      />
    </Layout.View>
  ) : (
    <></>
  );
}
