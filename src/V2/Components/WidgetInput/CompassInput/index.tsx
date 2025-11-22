import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { MarkerAssets } from '@AssetManager';
import { deepCopy } from '@V2/Globals/DeepCopy';
import { translations } from '@V2/Translations/index';
import { CompassInputData, CoordinateDTO, WidgetRules, WidgetScope, WidgetTheme } from '@V2/Types/ProjectTypes';
import { IDService } from '@V2/Services_Core/IDService';
import { ConfigService } from '@V2/Services/ConfigService';
import { PopUpAPI } from '@V2/Layers/API/PopUp';
import { useCompassLayer } from '@V2/Layers/API/Compass';
import { useMap_SetMarker } from '@V1/Layers/API/Map';

import { LC } from '../__LC__';
import { AddMeasurementButton } from './AddMeasurentButton';
import { AllMeasurements } from './AllMeasurements';

/**
 * @WARNING
 * USE THIS TO START FASTER A NEW INPUT DEVELOPMENT
 */
export const CompassInput = memo((props: {
  widgetScope: WidgetScope
  inputData: CompassInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: WidgetTheme
  onSave: (inputData: CompassInputData) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.compass[config.language], []);
  const [inputData           , setInputData           ] = useState<CompassInputData>(deepCopy(props.inputData));
  const [editMode            , setEditMode            ] = useState<boolean>(false);
  const [openMeasurementIndex, setOpenMeasurementIndex] = useState<number | null>(null);
  const [show, setShow] = useState({
    compass: false,
    map: false,
  })

  /**
   * @WARNING
   * Never call this function from inside a state setter.
   * It can cause `Cannot update a component while rendering a different component` react error.
   */
  const asyncSave = useCallback(async (inputData: CompassInputData) => {
    props.onSave(deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string, inputData: CompassInputData) => {
    const newData: CompassInputData = { ...inputData, label: newLabel};
    asyncSave(newData);
    setInputData(prev => ({ ...prev, label: newLabel}));
  }, [asyncSave]);

  const onMeasurementLabelChange = useCallback((newLabel: string, index: number) => {
    const newData: CompassInputData = { ...inputData }
    newData.value[index].label = newLabel;
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave, inputData]);

  const onMeasurementHeadingChange = useCallback((newHeading: number, index: number) => {
    const newData: CompassInputData = { ...inputData }
    newData.value[index].heading = newHeading;
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave, inputData]);

  const onMeasurementDipChange = useCallback((newDip: number, index: number) => {
    const newData: CompassInputData = { ...inputData }
    newData.value[index].dip = newDip;
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave, inputData]);

  const onMeasurementMarkerPositionChange = useCallback((newPosition: CoordinateDTO, index: number) => {
    const newData: CompassInputData = { ...inputData }
    newData.value[index].coordinates = newPosition;
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave, inputData]);

  const onMeasurementMarkerPositioDelete = useCallback((index: number) => {
    const newData: CompassInputData = { ...inputData }
    if (newData.value[index].coordinates) {
      delete newData.value[index].coordinates;
    }
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave, inputData]);

  const onMeasurementMarkerPress = useCallback((mapMarker: MarkerAssets, index: number) => {
    const newData: CompassInputData = { ...inputData }
    newData.lastUsedMarkerIcon = mapMarker;
    newData.value[index].markerIcon = mapMarker;
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave, inputData]);

  const onMeasurementMarkerPositionPress = useCallback((index: number) => {
    setOpenMeasurementIndex(index);
    setShow(prev => ({ ...prev, map: true }));
  }, [asyncSave, inputData]);

  const onMeasurementDelete = useCallback((index: number) => {
    PopUpAPI.handleAlert(true, {
      question: R['Confirm to delete this measurement'],
      type: 'warning',
    }, () => {
      const newData: CompassInputData = { ...inputData }
      newData.value.splice(index, 1);
      asyncSave(newData);
      setInputData(newData);
    });
  }, [asyncSave, inputData]);

  const addMeasurement = useCallback(async (heading: number, dip: number) => {
    const newData: CompassInputData = {
      ...inputData,
      value: [
        ...inputData.value,
        {
          id: IDService.generateUuidV4(),
          label: '',
          heading: heading,
          dip: dip,
          markerIcon: inputData.lastUsedMarkerIcon,
        }
      ]
    };
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave, inputData]);

  useCompassLayer({
    config: { mode: 'measurement' },
    onMeasurementTake: async (heading, dip) => await addMeasurement(heading, dip),
    onCompassClose: () => setShow(prev => ({ ...prev, compass: false })),
  }, [show.compass, inputData]);

  useMap_SetMarker({
    openMap: show.map,
    measurement: openMeasurementIndex !== null ? inputData.value[openMeasurementIndex] : null,
    onCloseMap: () => {
      setShow(prev => ({ ...prev, map: false }));
      setOpenMeasurementIndex(null);
    },
    onRegionChangeCallback: (coordinates: CoordinateDTO | undefined) => {
      if (coordinates && openMeasurementIndex !== null) {
        onMeasurementMarkerPositionChange({
          lat: coordinates.lat,
          long: coordinates.long,
          accuracy: coordinates.accuracy,
        }, openMeasurementIndex);
        return
      }
      if (openMeasurementIndex !== null) {
        onMeasurementMarkerPositioDelete(openMeasurementIndex);
        return
      }
    },
  });

  return (
    <LC.Root

      label={inputData.label}
      lockedLabel={inputData.lockedLabel}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={(label) => onLabelChange(label, inputData)}
      onInputDelete={() => props.onInputDelete()}
      onInputMoveUp={() => props.onInputMoveUp()}
      onInputMoveDow={() => props.onInputMoveDow()}
      widgetRules={props.widgetRules}
      theme={props.theme}

      iconButtons={
        <IconButtons
          editMode={editMode}
          locked={inputData.lockedData}
          allowMeasurementDeletion={inputData.allowMeasurementDeletion}
          onPress_EditButton={() => setEditMode(prev => !prev)}
          theme={props.theme}
        />
      }
    >
      <View
        style={{
          alignItems: 'flex-start',
          paddingVertical: 10,
          gap: 5,
        }}
      >
        <AllMeasurements
          widgetScope={props.widgetScope}
          measurements={inputData.value}
          lockedData={inputData.lockedData}
          allowMeasurementLabelChange={inputData.allowMeasurementLabelChange}
          allowMeasurementDataChange={inputData.allowMeasurementDataChange}
          allowMeasurementDeletion={inputData.allowMeasurementDeletion}
          editMode={editMode}
          theme={props.theme}
          onMeasurementLabelChange={onMeasurementLabelChange}
          onMeasurementHeadingChange={onMeasurementHeadingChange}
          onMeasurementDipChange={onMeasurementDipChange}
          onMeasurementMarkerPress={onMeasurementMarkerPress}
          onMeasurementMarkerPositionPress={onMeasurementMarkerPositionPress}
          onMeasurementDelete={onMeasurementDelete}
        />
        <AddMeasurementButton
          showAddMeasurementButton={inputData.showAddMeasurementButton}
          theme={props.theme}
          onAddMeasurement={() => setShow(prev => ({ ...prev, compass: true }))}
        />
      </View>
    </LC.Root>
  );
});

const IconButtons = memo((props: {
  editMode: boolean
  locked: boolean | undefined
  allowMeasurementDeletion: boolean | undefined
  theme: WidgetTheme
  onPress_EditButton: () => void
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
    {(!props.locked && props.allowMeasurementDeletion === true) && (<>
      <LC.NavbarIconButton
        iconName={'options-outline'}
        onPress={() => props.onPress_EditButton()}
        selected={props.editMode}
        theme={props.theme}
      />
    </>)}
  </>);
});
