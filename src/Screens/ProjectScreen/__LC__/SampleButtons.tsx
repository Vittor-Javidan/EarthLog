import React, { useState, useMemo, useCallback } from 'react';
import { VirtualizedList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import { SampleSettings } from '@Types/ProjectTypes';

export function F_SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
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

  const renderItem = ({ item }: { item: SampleSettings }) => (
    <Button.TextWithIcon
      title={item.name}
      iconName="clipboard"
      onPress={() => navigate('SAMPLE SCOPE', id_project, item.id_sample)}
      theme={{
        font: theme.font_Button,
        font_Pressed: theme.font_active,
        background: theme.background_Button,
        background_Pressed: theme.background_active,
      }}
    />
  );

  return (
    <VirtualizedList<SampleSettings>
      data={CacheService.allSamples.slice().reverse()}
      maxToRenderPerBatch={5}
      renderItem={(item) => renderItem(item)}
      keyExtractor={(item) => item.id_sample}
      getItemCount={() => CacheService.allSamples.length}
      getItem={(data, index) => data[index]}
      ListFooterComponent={isDataLoading ? <Layout.Loading /> : null}
      onEndReachedThreshold={0.1}
      onEndReached={() => onEndReached()}
      onMomentumScrollBegin={() => onScroll()}
      contentContainerStyle={{
        paddingTop: 55,
        paddingBottom: 150,
        gap: 1,
      }}
    />
  );
}
