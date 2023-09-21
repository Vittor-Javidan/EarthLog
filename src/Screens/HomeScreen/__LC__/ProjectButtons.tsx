import React, { useMemo } from 'react';
import { View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';

export default function ProjectButtons() {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.HomeScreen[language], []);

  const allProjectButtons = CacheService.allProjects.map((settings, index) => {
    const isLastIndex = index === CacheService.allProjects.length - 1;
    return (
      <Button.TextWithIcon
        key={settings.id_project}
        title={settings.name}
        iconName="folder"
        iconSide="Right"
        onPress={() => navigate('PROJECT SCOPE', settings.id_project)}
        theme={{
          font: theme.onTertiary,
          font_Pressed: theme.tertiary,
          background: theme.tertiary,
          background_Pressed: theme.onTertiary,
        }}
        style={isLastIndex ? {
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        } : undefined}
      />
    );
  });

  const projectsAvailable = CacheService.allProjects.length > 0;

  return (<>
    {projectsAvailable && (
      <View
        style={{
          backgroundColor: theme.secondary,
          paddingHorizontal: 2,
          paddingBottom: 2,
          borderRadius: 10,
        }}
      >
        <Text.H2
          style={{
            marginVertical: 5,
            marginLeft: 5,
            color: theme.onSecondary,
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
