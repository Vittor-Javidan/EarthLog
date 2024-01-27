import React, { memo } from 'react';
import { View } from 'react-native';

import { LanguageTag } from '@V2/Types/AppTypes';

import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const LanguagesSelectionScreen = memo((props: {
  onLanguageChange: (languageTag: LanguageTag) => void
}) => {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <View
          style={{ gap: 1 }}
        >
          <LC.LanguageButtons
            onLanguageChange={(languageTag) => props.onLanguageChange(languageTag)}
          />
        </View>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
