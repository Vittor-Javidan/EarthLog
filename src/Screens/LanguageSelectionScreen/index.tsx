import React, { memo } from 'react';
import { View } from 'react-native';

import { LanguageTag } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const LanguagesSelectionScreen = memo((props: {
  onLanguageChange: (languageTag: LanguageTag) => void
}) => {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <View
        style={{ gap: 1 }}
      >
        <LC.LanguageButtons
          onLanguageChange={(languageTag) => props.onLanguageChange(languageTag)}
        />
      </View>
    </Layout.Screen>
  );
});
