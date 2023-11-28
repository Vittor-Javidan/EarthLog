import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { deepCopy } from '@V1/Globals/DeepCopy';
import { PictureInputData, WidgetRules, WidgetScope, WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import DateTimeService from '@V1/Services/DateTimeService';
import CameraService from '@V1/Services/CameraService';
import ConfigService from '@V1/Services/ConfigService';
import AlertService from '@V1/Services/AlertService';
import MediaService from '@V1/Services/MediaService';
import SyncService from '@V1/Services/SyncService';

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

  const id_project = useMemo(() => props.widgetScope.id_project, []);
  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.picture[config.language], []);
  const [inputData         , setInputData        ] = useState<PictureInputData>(deepCopy(props.inputData));
  const [allMissingPictures, setAllMissingìctures] = useState<string[]>(SyncService.identifyMissingPictures({ id_project }));
  const [show              , setShow             ] = useState({
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
      CameraService.configCamera({
        id_project: props.widgetScope.id_project,
        mode: 'photo',
        picturesAmount: inputData.value.length,
        picturesLimit: inputData.picturesAmountLimit,
      });
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
    if (
      newData.picturesAmountLimit !== undefined &&
      newData.picturesAmountLimit === newData.value.length
    ) {
      setShow(prev => ({ ...prev, camera: false}));
    }
  }, [asyncSave, inputData]);

  const onPictureShare = useCallback(async (index: number) => {
    const { id_picture } = inputData.value[index];
    if (!allMissingPictures.includes(id_picture)) {
      await MediaService.sharePicture(props.widgetScope.id_project, id_picture);
    }
  }, [inputData, allMissingPictures]);

  const onPictureDelete = useCallback((index: number) => {
    AlertService.handleAlert(true, {
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
      setInputData(newData);
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
    await AlertService.handleAlert(true, {
      type: 'download pictures',
      id_project: id_project,
      picturesIDs: id_picture ? [ id_picture ] : inputMissingPictures,
    }, async () => {
      await SyncService.loadAllSyncData();
      setAllMissingìctures(SyncService.identifyMissingPictures({ id_project }));
    });
  }, [inputData, allMissingPictures]);

  useCameraWatcher(onPictureTake, () => {
    setShow(prev => ({ ...prev, camera: false }));
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
              templatePictureScope: '* Templates are not allowed to take pictures',
            }}
            theme={props.theme}
          />
        )}
        <PicturesCarousel
          id_project={id_project}
          pictures={inputData.value}
          missingPictures={allMissingPictures}
          onPictureDelete={(index) => onPictureDelete(index)}
          onPictureShare={(index) => onPictureShare(index)}
          onDescriptionChange={(text, index) => onDescriptionChange(text, index)}
          onDownloadMissingPicture={(id_picture) => onDownloadMissingPicture(id_picture)}
          onDownloadAllMissingPictures={() => onDownloadMissingPicture()}
          theme={props.theme}
        />
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

function useCameraWatcher(
  onPictureCallback: (id_picture: string) => void,
  onCameraClose: () => void,
  deps: [PictureInputData, boolean]
) {
  const [inputData, openCamera] = deps;
  useEffect(() => {
    CameraService.onPictureCallback(onPictureCallback);
    CameraService.onCameraCloseCallback(onCameraClose);
    if (openCamera) {
      CameraService.openCamera();
    }
  }, [inputData, openCamera]);
}
