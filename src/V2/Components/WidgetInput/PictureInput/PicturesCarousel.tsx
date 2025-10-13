import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { View, Image, LayoutRectangle, TextInput } from 'react-native';
import PagerView from 'react-native-pager-view';

import { PictureData, WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import MediaService from '@V2/Services/MediaService';
import ConfigService from '@V2/Services/ConfigService';
import FontService from '@V2/Services/FontService';

import { Text } from '@V2/Text/index';
import { Button } from '@V2/Button/index';
import { Animation } from '@V2/Animation/index';

export const PicturesCarousel = memo((props: {
  id_project: string
  pictures: PictureData[]
  missingPictures: string[]
  theme: WidgetTheme
  onPictureShare: (index:number) => void
  onPictureDelete: (index: number) => void
  onDescriptionChange: (text: string, index: number) => void
  onDownloadMissingPicture: (id_picture: string) => void
  onDownloadAllMissingPictures: () => void
}) => {

  const pageRef                             = useRef<PagerView | null>(null);
  const config                              = useMemo(() => ConfigService.config, []);
  const R                                   = useMemo(() => translations.widgetInput.picture[config.language], []);
  const [dimensions    , setDimensions    ] = useState<LayoutRectangle>({ width: 0, height: 0, x: 0, y: 0});
  const [pictureIndex  , setPictureIndex  ] = useState<number>(0);

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
          initialPage={pictureIndex}
          ref={pageRef}
          onPageSelected={page => setPictureIndex(page.nativeEvent.position)}
          style={{
            flex: 1,
          }}
        >
          {AllImages}
        </PagerView>
        <InfoDisplay
          id_picture={props.pictures[pictureIndex].id_picture}
          selectedPicture={pictureIndex + 1}
          pictureAmount={props.pictures.length}
        />
        <CarouselButtons
          isPictureMissing={props.missingPictures.length > 0}
          isFirstPicture={pictureIndex === 0}
          isLastPicture={pictureIndex === props.pictures.length - 1}
          onScrollLeft={() => scrollLeft(pictureIndex)}
          onScrollRight={() => scrollRight(pictureIndex)}
          onPictureShare={() => props.onPictureShare(pictureIndex)}
          onPictureDelete={() => props.onPictureDelete(pictureIndex)}
          onDownloadAllMissingPictures={() => props.onDownloadAllMissingPictures()}
        />
      </>)}
    </View>
    {/*TODO:
      Move the input to outside this component, since is being possible to access propertie of undefined data.
      clearly the block bellow do not sync in time when the its parent deletes the PictureData.
    */}
    {props.pictures[pictureIndex] !== undefined && (
      <Animation.FadeOut
        key={props.pictures[pictureIndex].id_picture}
        duration={300}
      >
        <Text h3
          style={{
            paddingHorizontal: 20,
            color: props.theme.font,
          }}
        >
          {`${R['Picture']} ${pictureIndex + 1}: `}
        </Text>
        <TextInput
          value={props.pictures[pictureIndex].description}
          placeholder={R['Write here the picture caption']}
          placeholderTextColor={props.theme.font_placeholder}
          textAlignVertical="top"
          multiline={true}
          onChangeText={(text) => props.onDescriptionChange(text, pictureIndex)}
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
  isPictureMissing: boolean
  isFirstPicture: boolean
  isLastPicture: boolean
  onScrollLeft: () => void
  onScrollRight: () => void
  onPictureShare: () => void
  onPictureDelete: () => void
  onDownloadAllMissingPictures: () => void
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
          onPress={() => props.onScrollLeft()}
          theme={{
            font: '#DDD',
            font_active: '#666',
            background: '#666',
            background_active: '#222',
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
          onPress={() => props.onScrollRight()}
          theme={{
            font: '#DDD',
            font_active: '#666',
            background: '#666',
            background_active: '#222',
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
      {props.isPictureMissing && (
        <Button.Icon
          iconName="download-outline"
          onPress={() => props.onDownloadAllMissingPictures()}
          theme={{
            font: '#FFF',
            font_active: '#666',
            background: '#666',
            background_active: '#222',
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
      )}
      <Button.Icon
        iconName="share-outline"
        onPress={() => props.onPictureShare()}
        theme={{
          font: '#FFF',
          font_active: '#666',
          background: '#666',
          background_active: '#222',
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
        onPress={() => props.onPictureDelete()}
        theme={{
          font: '#FFF',
          font_active: '#666',
          background: '#666',
          background_active: '#222',
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
