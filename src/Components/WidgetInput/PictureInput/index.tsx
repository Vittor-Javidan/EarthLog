import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { PictureInputData, WidgetRules, WidgetScope, WidgetTheme } from '@Types/ProjectTypes';
import UtilService from '@Services/UtilService';
import CameraService from '@Services/CameraService';
import DateTimeService from '@Services/DateTimeService';
import ConfigService from '@Services/ConfigService';

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

  const config = useMemo(() => ConfigService.config, []);
  const [inputData, setInputData] = useState<PictureInputData>(UtilService.deepCopy(props.inputData));
  const [show     , setShow     ] = useState({
    openCamera: false,
  });

  /**
   * @WARNING
   * Never call this function from inside a state setter.
   * It can cause `Cannot update a component while rendering a different component` react error.
   */
  const asyncSave = useCallback(async (inputData: PictureInputData) => {
    props.onSave(UtilService.deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string) => {
    const newData: PictureInputData = { ...inputData, label: newLabel};
    asyncSave(newData);
    setInputData(prev => ({ ...prev, label: newLabel}));
  }, [asyncSave, inputData]);

  const openCamera = useCallback(() => {
    if (props.widgetScope.type !== 'template') {
      CameraService.configCamera({
        id_project: props.widgetScope.id_project,
        mode: 'photo',
      });
      setShow(prev => ({ ...prev, openCamera: true}));
    }
  }, []);

  const onPictureTake = useCallback(async (id_picture: string) => {
    const newData: PictureInputData = { ...inputData, value: [ ...inputData.value, {
      id_picture: id_picture,
      description: '',
      dateAndTimeUTC: DateTimeService.getCurrentDateTimeUTC(),
      dateAndTime: DateTimeService.getCurrentDateTime({
        dateFormat: config.dateFormat,
        timeFormat: config.timeFormat,
      }),
    }]};
    asyncSave(newData);
    setInputData(newData);
    if (
      newData.picturesAmountLimit !== undefined &&
      newData.picturesAmountLimit === newData.value.length
    ) {
      setShow(prev => ({ ...prev, openCamera: false}));
    }
  }, [asyncSave, inputData]);

  useCameraWatcher(onPictureTake, () => {
    setShow(prev => ({ ...prev, openCamera: false }));
  }, [inputData, show.openCamera]);

  return (
    <LC.Root

      label={inputData.label}
      lockedLabel={inputData.lockedLabel}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={onLabelChange}
      onInputDelete={props.onInputDelete}
      onInputMoveUp={props.onInputMoveUp}
      onInputMoveDow={props.onInputMoveDow}
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
          gap: 5,
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
          id_project={props.widgetScope.id_project}
          pictures={inputData.value}
          onPictureScroll={(index) => console.log(index)}
        />
        <OpenCameraButton
          onPress={openCamera}
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

