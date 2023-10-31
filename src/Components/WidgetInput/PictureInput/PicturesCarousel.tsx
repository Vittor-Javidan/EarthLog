import React, { memo, useCallback, useRef, useState } from 'react';
import { View, Image, LayoutRectangle } from 'react-native';
import PagerView from 'react-native-pager-view';

import { PictureData } from '@Types/ProjectTypes';
import MediaService from '@Services/MediaService';

import { Button } from '@Button/index';
import { Text } from '@Text/index';

export const PicturesCarousel = memo((props: {
  id_project: string
  pictures: PictureData[]
  onPictureScroll: (index: number) => void
  onPictureShare: (index:number) => void
  onPictureDelete: (index: number) => void
}) => {

  const pageRef = useRef<PagerView | null>(null);
  const [dimensions  , setDimensions  ] = useState<LayoutRectangle>({ width: 0, height: 0, x: 0, y: 0});
  const [pictureIndex, setPictureIndex] = useState<number>(0);

  const onPictureScroll = useCallback((pictureIndex: number) => {
    props.onPictureScroll(pictureIndex);
    setPictureIndex(pictureIndex);
  }, [props.onPictureScroll]);

  const scrollRight = useCallback((currentIndex: number) => {
    if (pageRef.current !== null) {
      pageRef.current.setPage(currentIndex + 1);
    }
  }, [props.pictures, pageRef.current]);

  const scrollLeft = useCallback((currentIndex: number) => {
    if (pageRef.current !== null) {
      pageRef.current.setPage(currentIndex - 1);
    }
  }, [props.pictures, pageRef.current]);

  const AllImages = props.pictures.map(pictureData => (
    <Image
      key={pictureData.id_picture}
      source={{ uri: MediaService.getPictureUri(props.id_project, pictureData.id_picture)}}
      resizeMode="cover"
      style={{
        flex: 1,
        alignSelf: 'center',
        height: dimensions.width,
        width: dimensions.width,
      }}
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
        initialPage={pictureIndex}
        ref={pageRef}
        onPageSelected={page => onPictureScroll(page.nativeEvent.position)}
        style={{
          flex: 1,
        }}
      >
        {AllImages}
      </PagerView>
      <IndexDisplay
        selectedPicture={pictureIndex + 1}
        pictureAmount={props.pictures.length}
      />
      <CarouselButtons
        isFirstPicture={pictureIndex === 0}
        isLastPicture={pictureIndex === props.pictures.length - 1}
        onScrollLeft={() => scrollLeft(pictureIndex)}
        onScrollRight={() => scrollRight(pictureIndex)}
        onPictureShare={() => props.onPictureShare(pictureIndex)}
        onPictureDelete={() => props.onPictureDelete(pictureIndex)}
      />
    </View>
  ) : <></>;
});

const IndexDisplay = memo((props: {
  selectedPicture: number,
  pictureAmount: number
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        justifyContent: 'center',
        top: 10,
        right: 10,
      }}
    >
      <Text p
        style={{
          color: '#FFF',
          textShadowRadius: 5,
          textShadowColor: '#000',
          textShadowOffset: { width: 0, height: 0 },
        }}
      >
        {props.selectedPicture.toString() + ' / ' + props.pictureAmount.toString()}
      </Text>
    </View>
  );
});

const CarouselButtons = memo((props: {
  isFirstPicture: boolean
  isLastPicture: boolean
  onScrollLeft: () => void
  onScrollRight: () => void
  onPictureShare: () => void
  onPictureDelete: () => void
}) => {
  return (<>
    {!props.isFirstPicture && (
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
          onPress={props.onScrollLeft}
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
    {!props.isLastPicture && (
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
          onPress={props.onScrollRight}
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
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: 10,
        paddingRight: 5,
        width: '100%',
      }}
    >
      <Button.Icon
        iconName="share-outline"
        onPress={props.onPictureShare}
        theme={{
          font: '#FFF',
          font_Pressed: '#666',
          background: '#666',
          background_Pressed: '#222',
        }}
        style={{
          backgroundColor: undefined,
          height: 40,
          width: 40,
          paddingHorizontal: 0,
          paddingVertical: 0,
          opacity: 0.5,
        }}
      />
      <Button.Icon
        iconName="trash"
        onPress={props.onPictureDelete}
        theme={{
          font: '#FFF',
          font_Pressed: '#666',
          background: '#666',
          background_Pressed: '#222',
        }}
        style={{
          backgroundColor: undefined,
          height: 40,
          width: 40,
          paddingHorizontal: 0,
          paddingVertical: 0,
          opacity: 0.5,
        }}
      />
    </View>
  </>);
});
