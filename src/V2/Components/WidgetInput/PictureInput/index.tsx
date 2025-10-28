import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { deepCopy } from '@V2/Globals/DeepCopy';
import { PictureInputData, WidgetRules, WidgetScope, WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import { DateTimeService } from '@V2/Services_Core/DateTimeService';
import { ConfigService } from '@V2/Services/ConfigService';
import { PopUpAPI } from '@V2/Layers/API/PopUp';
import { MediaService } from '@V2/Services/MediaService';
import { CacheService } from '@V2/Services/CacheService';
import { useCameraLayer } from '@V2/Layers/API/Camera';

import { LC } from '../__LC__';
import { OpenCameraButton } from './OpenCameraButton';
import { PicturesCarousel } from './PicturesCarousel';

export const PictureInput = memo((props: {
  widgetScope: WidgetScope
  inputData: PictureInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: WidgetTheme
  onSave: (inputData: PictureInputData) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const id_project                                  = useMemo(() => props.widgetScope.id_project, []);
  const config                                      = useMemo(() => ConfigService.config, []);
  const R                                           = useMemo(() => translations.widgetInput.picture[config.language], []);
  const [inputData         , setInputData         ] = useState<PictureInputData>(deepCopy(props.inputData));
  const [allMissingPictures, setAllMissingPìctures] = useState<string[]>(CacheService.identifyMissingPictures({ id_project }));
  const [pictureIndex      , setPictureIndex      ] = useState<number | null>(inputData.value.length > 0 ? 0 : null);
  const [show              , setShow              ] = useState({
    camera: false,
  });

  /**
   * @WARNING
   * Never call this function from inside a state setter.
   * It can cause `Cannot update a component while rendering a different component` react error.
   */
  const asyncSave = useCallback(async (inputData: PictureInputData) => {
    props.onSave(deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string) => {
    const newData: PictureInputData = { ...inputData, label: newLabel };
    asyncSave(newData);
    setInputData(prev => ({ ...prev, label: newLabel}));
  }, [asyncSave, inputData]);

  const openCamera = useCallback(() => {
    if (props.widgetScope.type !== 'template') {
      setShow(prev => ({ ...prev, camera: true }));
    }
  }, [inputData]);

  const onPictureTake = useCallback(async (id_picture: string) => {
    const newData: PictureInputData = { ...inputData, value: [ ...inputData.value, {
      id_picture:     id_picture,
      description:    '',
      dateAndTimeUTC: DateTimeService.getCurrentDateTimeUTC(),
      dateAndTime:    DateTimeService.getCurrentDateTime({
        dateFormat:   config.dateFormat,
        timeFormat:   config.timeFormat,
      }),
    }]};
    asyncSave(newData);
    setInputData(newData);
    setPictureIndex(newData.value.length - 1);
    if (
      newData.picturesAmountLimit !== undefined &&
      newData.picturesAmountLimit === newData.value.length
    ) {
      setShow(prev => ({ ...prev, camera: false }));
    }
  }, [asyncSave, inputData]);

  const onPictureShare = useCallback(async (index: number) => {
    const { id_picture } = inputData.value[index];
    if (!allMissingPictures.includes(id_picture)) {
      await MediaService.sharePicture(props.widgetScope.id_project, id_picture);
    }
  }, [inputData, allMissingPictures]);

  const onPictureDelete = useCallback((index: number) => {
    PopUpAPI.handleAlert(true, {
      type: 'warning',
      question: R['Confirm to permanently delete this picture. This action cannot be undone.'],
    }, async () => {
      const newData: PictureInputData = { ...inputData, value: [ ...inputData.value ] };
      await MediaService.deleteMediaRecursively({
        scope: 'picture',
        id_project: id_project,
        id_media: newData.value.splice(index, 1)[0].id_picture,
      });
      asyncSave(newData);
      setInputData(deepCopy(newData));
      setPictureIndex(prev => {
        if (prev === null) return null;
        if (newData.value.length === 0) return null;
        if (prev - 1 < 0) return 0;
        return prev - 1;
      })
    });
  }, [asyncSave, inputData]);

  const onDescriptionChange = useCallback((text: string, index: number) => {
    const newData = { ...inputData };
    newData.value[index].description = text;
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave, inputData]);

  const onDownloadMissingPicture = useCallback(async (id_picture?: string) => {
    const picturesIDs = inputData.value.map(pictureData => pictureData.id_picture);
    const inputMissingPictures = allMissingPictures.filter(id => picturesIDs.includes(id));
    await PopUpAPI.handleAlert(true, {
      type: 'download pictures',
      id_project: id_project,
      picturesIDs: id_picture ? [ id_picture ] : inputMissingPictures,
    }, async () => {
      await CacheService.loadAllSyncData();
      setAllMissingPìctures(CacheService.identifyMissingPictures({ id_project }));
    });
  }, [inputData, allMissingPictures]);

  useCameraLayer({
    scope: props.widgetScope,
    config: {
      id_project: props.widgetScope.id_project,
      mode: 'photo',
      picturesAmount: inputData.value.length,
      picturesLimit: inputData.picturesAmountLimit,
    },
    onPictureCallback: (id_picture: string) => onPictureTake(id_picture),
    onCameraClose: () => {
      setShow(prev => ({ ...prev, camera: false }));
    }
  }, [inputData, show.camera]);

  return (
    <LC.Root

      label={inputData.label}
      lockedLabel={inputData.lockedLabel}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={(newLabel) => onLabelChange(newLabel)}
      onInputDelete={() => props.onInputDelete()}
      onInputMoveUp={() => props.onInputMoveUp()}
      onInputMoveDow={() => props.onInputMoveDow()}
      widgetRules={props.widgetRules}
      theme={props.theme}
      style={{
        paddingHorizontal: 0,
      }}

      iconButtons={
        <IconButtons
          locked={inputData.lockedData}
          theme={props.theme}
        />
      }

    >
      <View
        style={{
          paddingVertical: 10,
          gap: 10,
        }}
      >
        {props.widgetScope.type === 'template' && (
          <LC.AlertMessages
            alertMessages={{
              templatePictureScope: R['* Templates are not allowed to take pictures'],
            }}
            theme={props.theme}
          />
        )}
        {(inputData.value.length > 0 && pictureIndex !== null) && (
          <PicturesCarousel
            id_project={id_project}
            pictures={inputData.value}
            missingPictures={allMissingPictures}
            selectedPictureIndex={pictureIndex}
            onPageChange={(pictureIndex) => setPictureIndex(pictureIndex)}
            onPictureDelete={(index) => onPictureDelete(index)}
            onPictureShare={(index) => onPictureShare(index)}
            onDescriptionChange={(text, index) => onDescriptionChange(text, index)}
            onDownloadMissingPicture={(id_picture) => onDownloadMissingPicture(id_picture)}
            onDownloadAllMissingPictures={() => onDownloadMissingPicture()}
            theme={props.theme}
          />
        )}
        <OpenCameraButton
          onPress={() => openCamera()}
          theme={props.theme}
          showButton={(
            inputData.picturesAmountLimit === undefined ||
            inputData.value.length < inputData.picturesAmountLimit
          )}
        />
      </View>
    </LC.Root>
  );
});

const IconButtons = memo((props: {
  locked: boolean | undefined
  theme: WidgetTheme
}) => {
  return (<>
    {props.locked && (
      <LC.NavbarIconButton
        iconName="lock-closed-sharp"
        onPress={() => {}}
        theme={{
          font: props.theme.wrong,
          background: props.theme.background,
        }}
      />
    )}
  </>);
});
