import React, { useState, memo, useCallback } from 'react';
import { Dimensions } from 'react-native';

import { GPS_DTO, WidgetData } from '@V2/Types/ProjectTypes';
import { ProjectService } from '@V2/Services/ProjectService';
import { MediaService } from '@V2/Services/MediaService';
import { CacheService } from '@V2/Services/CacheService';
import { PopUpAPI } from '@V2/Layers/API/PopUp';

import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const Screen_SampleData = memo((props: {
  id_project: string
  id_sample: string
  referenceGPS: GPS_DTO | undefined
  onScreenButton_ArrowBack: () => void
}) => {

  const { id_project, id_sample } = props;
  const [sampleWidgets , setSampleWidgets] = useState<WidgetData[]>(CacheService.allWidgets_Sample);

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
    await PopUpAPI.handleAlert(true, {
      type: 'template widget copy',
      id_project: id_project,
      id_sample: id_sample,
    }, () => setSampleWidgets(CacheService.allWidgets_Sample));
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          sampleRules={CacheService.getSampleFromCache({ id_sample }).rules}
          onArrowBackPress={() => props.onScreenButton_ArrowBack()}
          onCreateWidget={onCreateWidget}
          onCopyTemplateWidget={onCopyTemplateWidget}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 55,
            paddingHorizontal: 5,
            paddingBottom: Dimensions.get('screen').height - 240,
            gap: 10,
          }}
        >
          {/* {AllWidgets} */}
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
