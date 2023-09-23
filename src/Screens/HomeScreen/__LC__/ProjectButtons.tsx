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
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
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
          font: theme.font_Button,
          font_Pressed: theme.font,
          background: theme.background_Button,
          background_Pressed: theme.background,
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
          backgroundColor: theme.background,
          paddingHorizontal: 2,
          paddingBottom: 2,
          borderRadius: 10,
        }}
      >
        <Text h2
          style={{
            marginVertical: 5,
            marginLeft: 5,
            color: theme.font,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          {R['Projects']}
        </Text>
        <View
          style={{ gap: 2 }}
        >
          {allProjectButtons}
        </View>
      </View>
    )}
  </>);
}
