import React, { useCallback, useState } from 'react';
import { ListRenderItem, StyleProp, ViewStyle, VirtualizedList } from 'react-native';
import { Loading } from './Loading';

export function VirtualizeList<T>(props: {
  array: T[]
  renderItem: ListRenderItem<T>
  maxToRenderPerBatch: number
  header?: JSX.Element
  style?: StyleProp<ViewStyle>
  keyExtractor: (item: T, index: number) => string
}) {

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
    <VirtualizedList<T>
      data={props.array}
      maxToRenderPerBatch={props.maxToRenderPerBatch}
      renderItem={(item) => props.renderItem(item)}
      keyExtractor={(item, index) => props.keyExtractor(item, index)}
      getItemCount={() => props.array.length}
      getItem={(data, index) => data[index]}
      ListHeaderComponent={props.header}
      ListFooterComponent={isDataLoading ? <Loading /> : null}
      onEndReachedThreshold={0.1}
      onEndReached={() => onEndReached()}
      onMomentumScrollBegin={() => onScroll()}
      contentContainerStyle={props.style}
    />
  );
}
