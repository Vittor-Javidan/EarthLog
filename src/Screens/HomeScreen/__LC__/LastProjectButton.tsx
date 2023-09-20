import React, { useMemo } from 'react';
import { View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Text } from '@Text/index';

export default function LastProjectButton() {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.HomeScreen[language], []);

  const { id_project } = CacheService?.lastOpenProject;
  const lastProjectOpenExist = id_project !== '';

  return lastProjectOpenExist ? (
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
        {R['Recently Open']}
      </Text.H2>
      <Button.TextWithIcon
        title={CacheService.lastOpenProject.name}
        iconName="folder"
        iconSide="Right"
        onPress={() => navigate('PROJECT SCOPE', id_project)}
        theme={{
          font: theme.onTertiary,
          font_Pressed: theme.tertiary,
          background: theme.tertiary,
          background_Pressed: theme.onTertiary,
        }}
        style={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      />
    </View>
  ) : (
    <></>
  );
}
