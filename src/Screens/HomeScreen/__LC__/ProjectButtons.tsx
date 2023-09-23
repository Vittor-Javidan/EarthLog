import React, { useMemo } from 'react';
import { View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';
import ThemeService from '@Services/ThemeService';

export default function ProjectButtons() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme], []);
  const R      = useMemo(() => translations.Screens.HomeScreen[config.language], []);

  const projectsAvailable = CacheService.allProjects.length > 0;

  const allProjectButtons = CacheService.allProjects.map((settings, index) => {
    const isLastIndex = index === CacheService.allProjects.length - 1;
    const isFirstIndex = index === 0;
    return (
      <Button.TextWithIcon
        key={settings.id_project}
        title={settings.name}
        iconName="folder"
        iconSide="Right"
        onPress={() => navigate('PROJECT SCOPE', settings.id_project)}
        theme={{
          font: theme.onTertiary,
          background: theme.secondary,
          font_Pressed: theme.onTertiary,
          background_Pressed: theme.tertiary,
        }}
        style={{
          borderTopLeftRadius: isFirstIndex ? 10 : 0,
          borderTopRightRadius: isFirstIndex ? 10 : 0,
          borderBottomLeftRadius: isLastIndex ? 10 : 0,
          borderBottomRightRadius: isLastIndex ? 10 : 0,
        }}
      />
    );
  });

  return (<>
    {projectsAvailable && (
      <View
        style={{
          backgroundColor: theme.primary,
          paddingHorizontal: 2,
          paddingBottom: 2,
          borderRadius: 10,
        }}
      >
        <Text.H2
          style={{
            marginVertical: 5,
            marginLeft: 5,
            color: theme.onPrimary,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          {R['Projects']}
        </Text.H2>
        <View
          style={{ gap: 2 }}
        >
          {allProjectButtons}
        </View>
      </View>
    )}
  </>);
}
