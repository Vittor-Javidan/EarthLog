import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { View, Image, LayoutRectangle, TextInput, Pressable } from 'react-native';
import PagerView from 'react-native-pager-view';

import { PictureData, WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import { FontService } from '@V2/Services_Core/FontService';
import { MediaService } from '@V2/Services/MediaService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Text } from '@V2/Text/index';
import { Button } from '@V2/Button/index';
import { Animation } from '@V2/Animation/index';
import { useCameraPreviewLayer } from '@V2/Layers/API/CameraPreview';

export const PicturesCarousel = memo((props: {
  id_project: string
  pictures: PictureData[]
  selectedPictureIndex: number
  missingPictures: string[]
  theme: WidgetTheme
  onPictureShare: (index:number) => void
  onPictureDelete: (index: number) => void
  onDescriptionChange: (text: string, index: number) => void
  onDownloadMissingPicture: (id_picture: string) => void
  onDownloadAllMissingPictures: () => void
  onPageChange: (pictureIndex: number) => void
}) => {

  const { selectedPictureIndex } = props;
  const pageRef                             = useRef<PagerView | null>(null);
  const config                              = useMemo(() => ConfigService.config, []);
  const R                                   = useMemo(() => translations.widgetInput.picture[config.language], []);
  const [dimensions    , setDimensions    ] = useState<LayoutRectangle>({ width: 0, height: 0, x: 0, y: 0});
  const [showPreview   , setShowPreview   ] = useState<boolean>(false);

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
    return !props.missingPictures.includes(pictureData.id_picture) ? (
      <Pressable
        onPress={() => {
          setShowPreview(true)
        }}
        style={{ flex: 1 }}
        key={`Pressable-${pictureData.id_picture}`}
      >
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
      </Pressable>
    ) : (
      <View
        key={pictureData.id_picture}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button.RoundedIcon
          key={pictureData.id_picture}
          iconName="image"
          buttonDiameter={80}
          showPlusSign={false}
          onPress={() => props.onDownloadMissingPicture(pictureData.id_picture)}
          theme={{
            font:              props.theme.background,
            font_active:       props.theme.font,
            background:        props.theme.font,
            background_active: props.theme.background,
          }}
        />
      </View>
    );
  });

  const pictureUri = MediaService.getPictureUri(props.id_project, props.pictures[props.selectedPictureIndex].id_picture)
  useCameraPreviewLayer({
    showSaveButton: false,
    onClosePreview: () => setShowPreview(false),
    onSavePicture: () => {},
  }, [pictureUri, showPreview])

  return props.pictures.length > 0 ? (<>
    <View
      onLayout={e => setDimensions(e.nativeEvent.layout)}
      style={{
        height: dimensions.width,
        width: '100%',
      }}
    >
      {dimensions.height > 0 && (<>
        <PagerView
          initialPage={selectedPictureIndex}
          ref={pageRef}
          onPageSelected={page => props.onPageChange(page.nativeEvent.position)}
          style={{
            flex: 1,
          }}

          //We need a key to allow <Pressable /> to work when a deletion occurs
          key={props.pictures.map(p => p.id_picture).join('-')}
        >
          {AllImages}
        </PagerView>
        <InfoDisplay
          id_picture={props.pictures[selectedPictureIndex].id_picture}
          selectedPicture={selectedPictureIndex + 1}
          pictureAmount={props.pictures.length}
        />
        <CarouselButtons
          currentPictureId={props.pictures[selectedPictureIndex].id_picture}
          missingPictures={props.missingPictures}
          isPictureMissing={props.missingPictures.length > 0}
          isFirstPicture={selectedPictureIndex === 0}
          isLastPicture={selectedPictureIndex === props.pictures.length - 1}
          onScrollLeft={() => scrollLeft(selectedPictureIndex)}
          onScrollRight={() => scrollRight(selectedPictureIndex)}
          onPictureShare={() => props.onPictureShare(selectedPictureIndex)}
          onPictureDelete={() => props.onPictureDelete(selectedPictureIndex)}
          onDownloadAllMissingPictures={() => props.onDownloadAllMissingPictures()}
        />
      </>)}
    </View>
    {props.pictures[selectedPictureIndex] !== undefined && (
      <Animation.FadeOut
        duration={300}
      >
        <Text h3
          style={{
            paddingHorizontal: 20,
            color: props.theme.font,
          }}
        >
          {`${R['Picture']} ${selectedPictureIndex + 1}: `}
        </Text>
        <TextInput
          value={props.pictures[selectedPictureIndex].description}
          placeholder={R['Write here the picture caption']}
          placeholderTextColor={props.theme.font_placeholder}
          textAlignVertical="top"
          multiline={true}
          onChangeText={(text) => props.onDescriptionChange(text, selectedPictureIndex)}
          style={{
            alignSelf: 'center',
            width: dimensions.width,
            paddingHorizontal: 20,
            paddingVertical: 10,
            paddingBottom: 0,
            backgroundColor: props.theme.background,
            color: props.theme.font,
            fontFamily: FontService.FONT_FAMILY.p,
          }}
        />
      </Animation.FadeOut>
    )}
  </>) : <></>;
});

const InfoDisplay = memo((props: {
  id_picture: string,
  selectedPicture: number,
  pictureAmount: number
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        justifyContent: 'center',
        top: 10,
        left: 10,
      }}
    >
      <Animation.FadeOut
        key={props.id_picture}
        duration={300}
      >
        <Text p
          style={{
            color: '#FFF',
            textShadowRadius: 5,
            textShadowColor: '#000',
            textShadowOffset: { width: 0, height: 0 },
            fontSize: 10,
          }}
        >
          {'ID: ' + props.id_picture}
        </Text>
      </Animation.FadeOut>
      <Text p
        style={{
          color: '#FFF',
          textShadowRadius: 5,
          textShadowColor: '#000',
          textShadowOffset: { width: 0, height: 0 },
          fontSize: 10,
        }}
      >
        {props.selectedPicture.toString() + ' / ' + props.pictureAmount.toString()}
      </Text>
    </View>
  );
});

const CarouselButtons = memo((props: {
  currentPictureId: string
  missingPictures: string[]
  isPictureMissing: boolean
  isFirstPicture: boolean
  isLastPicture: boolean
  onScrollLeft: () => void
  onScrollRight: () => void
  onPictureShare: () => void
  onPictureDelete: () => void
  onDownloadAllMissingPictures: () => void
}) => {
  const isPictureAvailable = !props.missingPictures.includes(props.currentPictureId);
  return (<>
    {!props.isFirstPicture && (
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignContent: 'center',
          left: 0,
          height: '100%',
        }}
      >
        <Button.Icon
          iconName="chevron-back"
          onPress={() => props.onScrollLeft()}
          theme={{
            font: '#DDD',
            font_active: '#666',
            background: '#666',
            background_active: '#222',
          }}
          shadow
          shadowColor={'#000'}
          iconSize={60}
          style={{
            backgroundColor: undefined,
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
          alignContent: 'center',
          right: 0,
          height: '100%',
        }}
      >
        <Button.Icon
          iconName="chevron-forward"
          onPress={() => props.onScrollRight()}
          theme={{
            font: '#DDD',
            font_active: '#666',
            background: '#666',
            background_active: '#222',
          }}
          shadow
          shadowColor={'#000'}
          iconSize={60}
          style={{
            backgroundColor: undefined,
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
        bottom: 0,
        paddingRight: 5,
        width: '100%',
      }}
    >
      {props.isPictureMissing && (
        <Button.Icon
          iconName="cloud-download-outline"
          onPress={() => props.onDownloadAllMissingPictures()}
          theme={{
            font: '#FFF',
            font_active: '#666',
            background: '#666',
            background_active: '#222',
          }}
          shadow
          shadowColor={'#000'}
          iconSize={40}
          style={{
            backgroundColor: undefined,
            paddingHorizontal: 0,
            paddingVertical: 0,
            opacity: 0.5,
          }}
        />
      )}
      {isPictureAvailable && (
        <Button.Icon
          iconName="share-outline"
          onPress={() => props.onPictureShare()}
          theme={{
            font: '#FFF',
            font_active: '#666',
            background: '#666',
            background_active: '#222',
          }}
          shadow
          shadowColor={'#000'}
          iconSize={40}
          style={{
            backgroundColor: undefined,
            paddingLeft: 10,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 10,
            opacity: 0.5,
          }}
        />
      )}
      <Button.Icon
        iconName="trash"
        onPress={() => props.onPictureDelete()}
        theme={{
          font: '#FFF',
          font_active: '#666',
          background: '#666',
          background_active: '#222',
        }}
        shadow
        shadowColor={'#000'}
        iconSize={40}
        style={{
          backgroundColor: undefined,
          paddingRight: 0,
          paddingLeft: 5,
          paddingTop: 0,
          paddingBottom: 10,
          opacity: 0.5,
        }}
      />
    </View>
  </>);
});
