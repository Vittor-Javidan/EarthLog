import React, { memo, useCallback, useRef, useState } from 'react';
import { View, Image, LayoutRectangle, TextInput, Platform } from 'react-native';
import PagerView from 'react-native-pager-view';

import { PictureData, WidgetTheme } from '@Types/ProjectTypes';
import MediaService from '@Services/MediaService';

import { Button } from '@Button/index';
import { Text } from '@Text/index';
import CacheService from '@Services/CacheService';
import { Animation } from '@Animation/index';

export const PicturesCarousel = memo((props: {
  id_project: string
  pictures: PictureData[]
  theme: WidgetTheme
  onPictureShare: (index:number) => void
  onPictureDelete: (index: number) => void
  onDescriptionChange: (text: string, index: number) => void
  onDownloadPicture: (id_picture: string) => void
}) => {

  const pageRef = useRef<PagerView | null>(null);
  const [dimensions  , setDimensions  ] = useState<LayoutRectangle>({ width: 0, height: 0, x: 0, y: 0});
  const [pictureIndex, setPictureIndex] = useState<number>(0);

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

  const AllImages = props.pictures.map(pictureData => {
    return CacheService.allPicturesFiles.includes(`${pictureData.id_picture}.jpg`) ? (
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
    ) : (
      <Button.Icon
        key={pictureData.id_picture}
        iconName="download-outline"
        onPress={() => props.onDownloadPicture(pictureData.id_picture)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 0,
          paddingLeft: 10,
          paddingVertical: 0,
        }}
        theme={{
          font: props.theme.background,
          font_Pressed: props.theme.font,
          background: props.theme.font,
          background_Pressed: props.theme.background,
        }}
      />
    );
  });

  return props.pictures.length > 0 ? (<>
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
        onPageSelected={page => setPictureIndex(page.nativeEvent.position)}
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
    <Animation.FadeOut
      key={props.pictures[pictureIndex].id_picture}
      delay={30}
      duration={200}
    >
      <TextInput
        value={props.pictures[pictureIndex].description}
        placeholder={'- - - - - - - - - -'}
        placeholderTextColor={props.theme.font_placeholder}
        textAlign="center"
        textAlignVertical="top"
        multiline={true}
        onChangeText={(text) => props.onDescriptionChange(text, pictureIndex)}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          paddingBottom: Platform.OS === 'ios' ? 10 : 0,
          backgroundColor: props.theme.background,
          color: props.theme.font,
        }}
      />
    </Animation.FadeOut>
  </>) : <></>;
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
