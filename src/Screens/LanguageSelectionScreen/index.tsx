import React from 'react';
import { View } from 'react-native';

import { LanguageTag } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

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
