import React, { useMemo, useState } from 'react';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import { API } from '../__API__';

export default function ProjectButtons() {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.HomeScreen[language], []);
  const [_, refresh] = useState<boolean>(false);

  API.ProjectButtons.registerRefreshSetter(refresh);

  const allProjectButtons = CacheService.allProjects.map((settings, index) => {
    const isLastIndex = index === CacheService.allProjects.length - 1;
    return (
      <Layout.Button.TextWithIcon
        key={settings.id_project}
        title={settings.name}
        iconName="folder"
        iconSide="Right"
        color_background={theme.tertiary}
        color_font={theme.onTertiary}
        style={isLastIndex ? {
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        } : undefined}
        onPress={() => navigate('PROJECT SCREEN', settings.id_project)}
      />
    );
  });

  const projectsAvailable = CacheService.allProjects.length > 0;

  return (<>
    {projectsAvailable && (
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
          {R['Projects']}
        </Layout.Text.H2>
        <Layout.View
          style={{ gap: 2 }}
        >
          {allProjectButtons}
        </Layout.View>
      </Layout.View>
    )}
  </>);
}
