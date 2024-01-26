
import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const ExportProjectScreen = memo(() => {

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
        <Layout.ScrollView>
          <LC.AvailableExportFormatButtons />
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
