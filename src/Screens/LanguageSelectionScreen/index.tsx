import React, { memo } from 'react';
import { View } from 'react-native';

import { LanguageTag } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';
import { Animation } from '@Animation/index';

export const LanguagesSelectionScreen = memo((props: {
  onLanguageChange: (languageTag: LanguageTag) => void
}) => {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <Animation.SlideFromLeft
        delay={300}
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
