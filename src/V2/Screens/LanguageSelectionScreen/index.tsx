import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

import { LanguageTag } from '@V2/Types/AppTypes';

import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const LanguagesSelectionScreen = memo((props: {
  onLanguageChange: (languageTag: LanguageTag) => void
}) => {

  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <Animation.SlideFromLeft
        duration={200}
        start={startAnimation}
        onLayout={event => onLayout(event)}
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
