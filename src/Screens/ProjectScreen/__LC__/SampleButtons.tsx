import React, { useState, memo, useMemo, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [loadFinished , setLoadFinished ] = useState(false);

  const onEndReached = useCallback(() => {
    setLoadFinished(true);
    setIsDataLoading(false);
  }, []);

  const onScroll = useCallback(() => {
    if (loadFinished) { return; }
    setIsDataLoading(true);
  }, [loadFinished]);

  return (
    <FlatList
      data={CacheService.allSamples.slice().reverse()}
      maxToRenderPerBatch={5}
      initialNumToRender={5}
      keyExtractor={(item) => item.id_sample}
      refreshing={isDataLoading}
      ListFooterComponent={isDataLoading ? <Loading /> : null}
      onEndReached={() => onEndReached()}
      onScroll={() => onScroll()}
      renderItem={({item}) => (
        <SampleButton
          title={item.name}
          id_project={id_project}
          id_sample={item.id_sample}
        />
      )}
      contentContainerStyle={{
        paddingTop: 55,
        paddingBottom: 150,
        gap: 1,
      }}
    />
  );
}

const SampleButton = memo((props: {
  title: string,
  id_project: string,
  id_sample: string
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  return (
    <Button.TextWithIcon
      title={props.title}
      iconName="clipboard"
      onPress={() => navigate('SAMPLE SCOPE', props.id_project, props.id_sample)}
      theme={{
        font: theme.font_Button,
        font_Pressed: theme.font_active,
        background: theme.background_Button,
        background_Pressed: theme.background_active,
      }}
    />
  );
});

function Loading() {
  return (
    <Layout.Loading />
  );
}
