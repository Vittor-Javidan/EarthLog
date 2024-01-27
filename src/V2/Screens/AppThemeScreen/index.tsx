import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export const AppThemeScreen = memo((props: {
  onAppThemeChange: () => void
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
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 55,
            paddingRight: 1,
            gap: 1,
          }}
        >
          <LC.ThemeButtons
            onAppThemeChange={() => props.onAppThemeChange()}
          />
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
