import React, { useState, memo } from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import CacheService from '@Services/CacheService';
import { API } from '../__API__';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [loadFinished , setLoadFinished ] = useState(false);
  const [_            , refresh         ] = useState<boolean>(false);

  API.SampleButtons.registerRefreshSetter(refresh);

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
}) => (
  <Layout.Button.TextWithIcon
    title={props.title}
    iconSide="Right"
    iconName="clipboard"
    onPress={() => navigate('SAMPLE SCREEN', props.id_project, props.id_sample)}
  />
));

function Loading() {
  return (
    <Layout.Loading />
  );
}
