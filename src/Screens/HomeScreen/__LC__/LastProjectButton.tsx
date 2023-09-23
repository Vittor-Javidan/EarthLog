import React, { useMemo } from 'react';
import { View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Text } from '@Text/index';

export default function LastProjectButton() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.Screens.HomeScreen[config.language], []);

  const { id_project } = CacheService?.lastOpenProject;
  const lastProjectOpenExist = id_project !== '';

  return lastProjectOpenExist ? (
    <View
      style={{
        backgroundColor: theme.background,
        paddingHorizontal: 2,
        paddingBottom: 2,
        borderRadius: 10,
      }}
    >
      <Text.H2
        style={{
          marginVertical: 5,
          marginLeft: 5,
          color: theme.font,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        {R['Recently Open']}
      </Text.H2>
      <Button.TextWithIcon
        title={CacheService.lastOpenProject.name}
        iconName="folder"
        iconSide="Right"
        onPress={() => navigate('PROJECT SCOPE', id_project)}
        theme={{
          font: theme.font_Button,
          font_Pressed: theme.font,
          background: theme.background_Button,
          background_Pressed: theme.background,
        }}
        style={{
          borderRadius: 10,
        }}
      />
    </View>
  ) : (
    <></>
  );
}
