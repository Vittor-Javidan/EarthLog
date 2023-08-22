import React, { useState, useMemo, memo, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MotiView } from 'moti';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import CacheService from '@Services/CacheService';
import { FlatList } from 'react-native-gesture-handler';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;
  const [isDataLoading, setIsDataLoading] = useState(true);

  return (
    <Animation>
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
    </Animation>
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

function Animation(props: { children: ReactNode}) {

  const { width } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      from={{ left: -width }}
      transition={{
        type: 'timing',
        duration: 200,
        delay: 300,
      }}
      animate={{
        left: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}

function Loading() {
  return (
    <Layout.View
      style={{ height: 200 }}
    >
      <Layout.Loading />
    </Layout.View>
  );
}
