import React, { memo, useCallback, useRef, useState } from 'react';
import { View, Image, LayoutRectangle } from 'react-native';
import PagerView from 'react-native-pager-view';

import { PictureData } from '@Types/ProjectTypes';
import CameraService from '@Services/CameraService';
import { Button } from '@Button/index';


export const PicturesCarousel = memo((props: {
  id_project: string
  pictures: PictureData[]
  onPictureScroll: (index: number) => void
}) => {

  const pageRef = useRef<PagerView | null>(null);
  const [dimensions  , setDimensions  ] = useState<LayoutRectangle>({ width: 0, height: 0, x: 0, y: 0});
  const [pictureIndex, setPictureIndex] = useState<number>(0);

  const onPictureScroll = useCallback((pictureIndex: number) => {
    props.onPictureScroll(pictureIndex);
    setPictureIndex(pictureIndex);
  }, [props.onPictureScroll]);

  const scrollRight = useCallback((currentIndex: number) => {
    if (pageRef.current !== null && currentIndex < props.pictures.length) {
      pageRef.current.setPage(currentIndex + 1);
    }
  }, [props.pictures, pageRef.current]);

  const scrollLeft = useCallback((currentIndex: number) => {
    if (pageRef.current !== null && currentIndex > 0) {
      pageRef.current.setPage(currentIndex - 1);
    }
  }, [props.pictures, pageRef.current]);

  const AllImages = props.pictures.map(pictureData => (
    <PictureDisplay
      key={pictureData.id_picture}
      id_project={props.id_project}
      pictureData={pictureData}
      dimensions={dimensions}
    />
  ));

  return props.pictures.length > 0 ? (
    <View
      onLayout={e => setDimensions(e.nativeEvent.layout)}
      style={{
        height: dimensions.width,
        width: '100%',
      }}
    >
      <PagerView
        // pageMargin={dimensions.width}
        initialPage={pictureIndex}
        ref={pageRef}
        onPageSelected={page => onPictureScroll(page.nativeEvent.position)}
        style={{
          flex: 1,
        }}
      >
        {AllImages}
      </PagerView>
      {pictureIndex !== 0 && (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            left: 0,
            height: '100%',
          }}
        >
          <Button.Icon
            iconName="chevron-back"
            onPress={() => scrollLeft(pictureIndex)}
            theme={{
              font: '#DDD',
              font_Pressed: '#666',
              background: '#666',
              background_Pressed: '#222',
            }}
            style={{
              backgroundColor: undefined,
              height: 50,
              width: 50,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          />
        </View>
      )}
      {pictureIndex !== props.pictures.length - 1 && (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            right: 0,
            height: '100%',
          }}
        >
          <Button.Icon
            iconName="chevron-forward"
            onPress={() => scrollRight(pictureIndex)}
            theme={{
              font: '#DDD',
              font_Pressed: '#666',
              background: '#666',
              background_Pressed: '#222',
            }}
            style={{
              backgroundColor: undefined,
              height: 50,
              width: 50,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          />
        </View>
      )}
    </View>
  ) : <></>;
});

const PictureDisplay = memo((props: {
  id_project: string
  pictureData: PictureData
  dimensions: LayoutRectangle
}) => {
  return (
    <Image
      source={{ uri: CameraService.getPictureUri(props.id_project, props.pictureData.id_picture)}}
      style={{
        flex: 1,
        alignSelf: 'center',
        height: props.dimensions.width,
        width: props.dimensions.width,
      }}
      resizeMode="cover"
    />
  );
});
