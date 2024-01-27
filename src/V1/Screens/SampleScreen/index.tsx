import React, { useState, memo, useCallback } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { GPS_DTO, WidgetData } from '@V1/Types/ProjectTypes';
import ProjectService from '@V1/Services/ProjectService';
import MediaService from '@V1/Services/MediaService';
import CacheService from '@V1/Services/CacheService';
import AlertService from '@V1/Services/AlertService';

import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const SampleDataScreens = memo((props: {
  referenceGPS: GPS_DTO | undefined
}) => {

  const id_project                          = useLocalSearchParams().id_project as string;
  const id_sample                           = useLocalSearchParams().id_sample as string;
  const [sampleWidgets , setSampleWidgets ] = useState<WidgetData[]>(CacheService.allWidgets_Sample);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  const onCreateWidget = useCallback(async () => {
    const newWidget = ProjectService.getWidgetData();
    await ProjectService.createWidget({
      path: 'sample widgets',
      id_project: id_project,
      id_sample: id_sample,
      widgetData: newWidget,
      sync: true,
      onSuccess: () => {
        CacheService.addToAllWidgets_Sample({ widgetData: newWidget });
        setSampleWidgets(CacheService.allWidgets_Sample);
      },
      onError: (errorMessage) => alert(errorMessage),
    });
  }, [sampleWidgets]);

  const onDeleteWidget = useCallback(async (index: number) => {
    const newData: WidgetData[] = [ ...sampleWidgets ];
    const removedWidget = newData.splice(index, 1)[0];
    await ProjectService.deleteWidget({
      path: 'sample widgets',
      id_project: id_project,
      id_sample: id_sample,
      widgetData: removedWidget,
      sync: true,
      onSuccess: async () => {
        await MediaService.deleteMediaRecursively({
          scope: 'widget',
          id_project: id_project,
          widget: removedWidget,
        });
        CacheService.allWidgets_Sample = newData;
        setSampleWidgets(newData);
      },
      onError: (errorMessage) => alert(errorMessage),
    });
  }, [sampleWidgets]);

  const onCopyTemplateWidget = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'template widget copy',
      id_project: id_project,
      id_sample: id_sample,
    }, () => setSampleWidgets(CacheService.allWidgets_Sample));
  }, []);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCreateWidget={onCreateWidget}
          onCopyTemplateWidget={onCopyTemplateWidget}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
        start={startAnimation}
        onLayout={event => onLayout(event)}
      >
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 55,
            paddingHorizontal: 5,
            paddingBottom: Dimensions.get('window').height - 240,
            gap: 10,
          }}
        >
          <LC.SampleWidgets
            id_project={id_project}
            id_sample={id_sample}
            referenceGPS={props.referenceGPS}
            sampleWidgets={sampleWidgets}
            onDeleteWidget={onDeleteWidget}
          />
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
