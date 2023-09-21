import React, { useState, memo, useMemo } from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import CacheService from '@Services/CacheService';
import ConfigService from '@Services/ConfigService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [loadFinished , setLoadFinished ] = useState(false);

  function onEndReached() {
    setLoadFinished(true);
    setIsDataLoading(false);
  }

  function onScroll() {
    if (loadFinished) { return; }
    setIsDataLoading(true);
  }

  return (
    <FlatList
      data={CacheService.allSamples}
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

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <Button.TextWithIcon
      title={props.title}
      iconSide="Right"
      iconName="clipboard"
      onPress={() => navigate('SAMPLE SCOPE', props.id_project, props.id_sample)}
      theme={{
        font: theme.onSecondary,
        font_Pressed: theme.secondary,
        background: theme.secondary,
        background_Pressed: theme.onSecondary,
      }}
    />
  );
});

function Loading() {
  return (
    <Layout.Loading />
  );
}
