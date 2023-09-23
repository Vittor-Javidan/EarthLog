import React from 'react';
import { View } from 'react-native';

import { Layout } from '@Layout/index';

import { LC } from './__LC__';
import { TC } from './__TC__';
import { LanguageTag } from '@Types/AppTypes';

export default function LanguagesSelectionScreen(props: {
  onLanguageChange: (languageTag: LanguageTag) => void
}): JSX.Element {

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <View
        style={{ gap: 1 }}
      >
        <LC.LanguageButtons
          onLangaugeSelected={(languageTag) => props.onLanguageChange(languageTag)}
        />
      </View>
    </Layout.Screen>
  );
}
