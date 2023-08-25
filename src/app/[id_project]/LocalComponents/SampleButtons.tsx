import React, { useState, memo } from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import CacheService from '@Services/CacheService';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;
  const [isDataLoading, setIsDataLoading] = useState(true);

  return (
    <FlatList
      data={CacheService.allSamples}
      alwaysBounceHorizontal={true}
      maxToRenderPerBatch={5}
      initialNumToRender={10}
      keyExtractor={(item) => item.id_sample}
      refreshing={isDataLoading}
      ListFooterComponent={isDataLoading ? <Loading /> : null}
      onEndReached={() => setIsDataLoading(false)}
      renderItem={({item}) => (
        <SampleButton
          title={item.name}
          id_project={id_project}
          id_sample={item.id_sample}
        />
      )}
      contentContainerStyle={{
        paddingTop: 1,
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
    <Layout.View
      style={{ height: 200 }}
    >
      <Layout.Loading />
    </Layout.View>
  );
}
