import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import LogService from '../Services/LogService';

import APPColors from '../Globals/Colors';
import { InitializationScreenTranslations, languages } from './translations';
import { Languages } from '../Types/LanguageTypes';
import ConfigService from '../Services/ConfigService';

export default function InitializationScreen(): JSX.Element {

  LogService.useLog('INITIALIZATION SCREEN: rendered');
  const stringResources = useMemo<InitializationScreenTranslations[Languages]>(
    () => languages[ConfigService.config.language], []
  );

  return (
    <View
      style={{
        backgroundColor: APPColors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          fontSize: 36,
          color: APPColors.onBackground,
        }}
      >
        {stringResources['Loading...']}
      </Text>
    </View>
  );
}
