import React, { useMemo, useState, memo, useCallback } from 'react';
import { View } from 'react-native';

import { GPS_DTO, ID, InputData, InputStatus, WidgetData, WidgetScope, WidgetThemeDTO } from '@Types/ProjectTypes';
import UtilService from '@Services/UtilService';
import ProjectService from '@Services/ProjectService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';

import { Navbar } from './Navbar';
import { LabelButton } from './LabelButton';
import { NavbarIconButton } from './NavbarIconButtons';
import { AllInputs } from './AllInputs';
import { NewInputDisplay } from './NewInputDisplay';
import { Footer } from './Footer';
import { ThemeDisplay } from './ThemeDisplay';

type WidgetDisplay = 'data display' | 'theme display' | 'new input display'

export const Widget = memo((props: {
  widgetData: WidgetData
  widgetScope: WidgetScope
  referenceGPSData: GPS_DTO | undefined
  onDelete: () => void
}) => {

  const [widgetData , setWidgetData ] = useState<WidgetData>(UtilService.deepCopy(props.widgetData));
  const [tempLabel  , setTempLabel  ] = useState<string>(widgetData.widgetName);
  const [editLabel  , setEditLabel  ] = useState<boolean>(false);
  const [editInputs , setEditInputs ] = useState<boolean>(false);
  const [saved      , setSaved      ] = useState<boolean>(true);
  const [display    , setDisplay    ] = useState<WidgetDisplay>(widgetData.inputs.length <= 0 ? 'new input display' : 'data display');

  const defaultTheme = useMemo(() => ThemeService.widgetThemes['default'], []);
  const widgetTheme  = useMemo<WidgetThemeDTO>(() => ({
    font:             widgetData?.widgetTheme?.font             ?? defaultTheme.font,
    font_placeholder: widgetData?.widgetTheme?.font_placeholder ?? defaultTheme.font_placeholder,
    background:       widgetData?.widgetTheme?.background       ?? defaultTheme.background,
    wrong:            widgetData?.widgetTheme?.wrong            ?? defaultTheme.wrong,
    confirm:          widgetData?.widgetTheme?.confirm          ?? defaultTheme.confirm,
    modified:         widgetData?.widgetTheme?.modified         ?? defaultTheme.modified,
    disabled:         widgetData?.widgetTheme?.disabled         ?? defaultTheme.disabled,
  }), [widgetData.widgetTheme]);

  const onLabelChange = useCallback((label: string) => {
    setTempLabel(label);
    setSaved(false);
  }, []);

  const selectDisplay = useCallback((newDisplay: WidgetDisplay) => {
    if (display === newDisplay) {
      setDisplay('data display');
      return;
    }
    setDisplay(newDisplay);
  }, [display]);

  const togleEditDisplay = useCallback(() => {
    selectDisplay('data display');
    setEditInputs(true);
  }, [selectDisplay]);

  const togleDataDisplay = useCallback(() => {
    selectDisplay('data display');
    setEditInputs(false);
  }, [selectDisplay]);

  const togleThemeDisplay = useCallback(() => {
    selectDisplay('theme display');
    setEditInputs(false);
  }, [selectDisplay]);

  const togleNewInputDisplay = useCallback(() => {
    selectDisplay('new input display');
    setEditInputs(false);
  }, [selectDisplay]);

  const save = useCallback((widgetData: WidgetData) => {

    if (props.widgetScope.type === 'project') {
      ProjectService.updateWidget_Project(
        props.widgetScope.id_project,
        widgetData,
        () => setSaved(true),
        (error) => alert(error)
      );
      return;
    }

    if (props.widgetScope.type === 'template') {
      ProjectService.updateWidget_Template(
        props.widgetScope.id_project,
        widgetData,
        () => setSaved(true),
        (error) => alert(error)
      );
      return;
    }

    if (props.widgetScope.type === 'sample') {
      ProjectService.updateWidget_Sample(
        props.widgetScope.id_project,
        props.widgetScope.id_sample,
        widgetData,
        () => setSaved(true),
        (error) => alert(error)
      );
      return;
    }
  }, [props.widgetScope]);

  const onConfirmLabel = useCallback(() => {
    setEditLabel(false);
    setWidgetData(prev => {
      const newData = { ...prev, widgetName: tempLabel};
      save(newData);
      return newData;
    });
  }, [tempLabel, save]);

  const onCreateInput = useCallback((inputData: InputData) => {
    setSaved(false);
    setWidgetData(prev => {
      const newData: WidgetData = { ...prev, inputs: [...prev.inputs, inputData]};
      save(newData);
      return newData;
    });
    togleNewInputDisplay();
  }, [togleNewInputDisplay, save]);

  const onConfirmInput = useCallback((inputData: InputData | null, status: InputStatus) => {
    if (status === 'modifying') {
      setSaved(false);
      return;
    }
    if (status === 'ready to save' && inputData !== null) {
      setWidgetData(prev => {
        for (let i = 0; i < prev.inputs.length; i++) {
          if ( prev.inputs[i].id_input === inputData.id_input) {
            prev.inputs[i] = inputData;
          }
        }
        const newData = { ...prev };
        save(newData);
        return newData;
      });
    }
  }, [save]);

  const onAddToNewSamplesChange = useCallback((boolean: boolean) => {
    setSaved(false);
    setWidgetData(prev => {
      const newData: WidgetData = { ...prev, addToNewSamples: boolean};
      save(newData);
      return newData;
    });
  }, [save]);

  const deleteWidget = useCallback(() => {
    AlertService.handleAlert(
      true,
      {
        question: 'Confirm to delete this widget.',
        type: 'warning',
      },
      () => props.onDelete()
    );
  }, [props.onDelete]);

  const onDelete = useCallback((id_input: ID) => {
    AlertService.handleAlert(
      true,
      {
        question: 'Confirm to delete this input.',
        type: 'warning',
      },
      () => {
        setSaved(false);
        setWidgetData(prev => {
          const newData = { ...prev };
          for (let i = 0; i < newData.inputs.length; i++) {
            if (newData.inputs[i].id_input === id_input) {
              newData.inputs.splice(i, 1);
              break;
            }
          }
          save(newData);
          return newData;
        });
      }
    );
  }, [save]);

  const onMoveUp = useCallback((id_input: ID) => {
    setSaved(false);
    setWidgetData(prev => {
      const newData = { ...prev };
      for (let i = 0; i < newData.inputs.length; i++) {
        if (newData.inputs[i].id_input === id_input) {
          if (i === 0) { break; }
          const tempInput = newData.inputs[i - 1];
          newData.inputs[i - 1] = newData.inputs[i];
          newData.inputs[i] = tempInput;
          break;
        }
      }
      save(newData);
      return newData;
    });
  }, [save]);

  const onMoveDown = useCallback((id_input: ID) => {
    setSaved(false);
    setWidgetData(prev => {
      const newData = { ...prev };
      for (let i = 0; i < newData.inputs.length; i++) {
        if (newData.inputs[i].id_input === id_input) {
          if (i === newData.inputs.length - 1) { break; }
          const tempInput = newData.inputs[i + 1];
          newData.inputs[i + 1] = newData.inputs[i];
          newData.inputs[i] = tempInput;
          break;
        }
      }
      save(newData);
      return newData;
    });
  }, [save]);

  return (
    <View
      style={{
        backgroundColor: widgetTheme.background,
        borderRadius: 10,
      }}
    >
      <Navbar
        saved={saved}
        theme={widgetTheme}
        iconButtons={
          <IconButtons
            display={display}
            editInputs={editInputs}
            onPress_DataDisplayButton={() => togleDataDisplay()}
            onPress_EditButton={() => togleEditDisplay()}
            onPress_ThemeButton={() => togleThemeDisplay()}
            onPress_NewInputButton={() => togleNewInputDisplay()}
            theme={widgetTheme}
          />
        }
      />
      <View
        style={{
          paddingTop: 10,
          gap: 10,
        }}
      >
        <View
          style={{
            paddingBottom: 5,
            gap: 5,
          }}
        >
          <LabelButton
            label={tempLabel}
            editLabel={editLabel}
            noInputs={widgetData.inputs.length <= 0}
            onPress={() => setEditLabel(true)}
            onConfirm={() => onConfirmLabel()}
            onLabelChange={(label) => onLabelChange(label)}
            theme={widgetTheme}
          />
          {display === 'data display' && (<>
            <AllInputs
              inputs={widgetData.inputs}
              editInputs={editInputs}
              referenceGPSData={props.referenceGPSData}
              onSave={(inputData, status) => onConfirmInput(inputData, status)}
              onInputDelete={(id_input) => onDelete(id_input)}
              onInputMoveUp={(id_input) => onMoveUp(id_input)}
              onInputMoveDow={(id_input) => onMoveDown(id_input)}
              theme={widgetTheme}
            />
          </>)}
          {display === 'new input display' && (
            <NewInputDisplay
              onCreate={(inputData) => onCreateInput(inputData)}
              theme={widgetTheme}
            />
          )}
          {display === 'theme display' && (
            <ThemeDisplay
              theme={widgetTheme}
            />
          )}
        </View>
        <Footer
          showDeleteWidgetButton={editInputs}
          showCheckbox={props.widgetScope.type === 'template'}
          AddToNewSamples={widgetData.addToNewSamples ?? false}
          onChangeCheckbox={(checked) => onAddToNewSamplesChange(checked)}
          onDeleteWidget={() => deleteWidget()}
          theme={widgetTheme}
        />
      </View>
    </View>
  );
});

function IconButtons(props: {
  editInputs: boolean
  display: WidgetDisplay
  theme: WidgetThemeDTO
  onPress_DataDisplayButton: () => void
  onPress_EditButton: () => void
  onPress_NewInputButton: () => void
  onPress_ThemeButton: () => void
}) {
  return (<>
    <NavbarIconButton
      iconName="pencil-sharp"
      position="other"
      selected={props.display === 'data display' && !props.editInputs}
      onPress={() => props.onPress_DataDisplayButton()}
      theme={{
        font: props.theme.font,
        background: props.theme.background,
      }}
    />
    <NavbarIconButton
      iconName="options-outline"
      position="other"
      selected={props.display === 'data display' && props.editInputs}
      onPress={() => props.onPress_EditButton()}
      theme={{
        font: props.theme.font,
        background: props.theme.background,
      }}
    />
    <NavbarIconButton
      iconName="color-palette"
      position="other"
      selected={props.display === 'theme display'}
      onPress={() => props.onPress_ThemeButton()}
      theme={{
        font: props.theme.font,
        background: props.theme.background,
      }}
    />
    <NavbarIconButton
      iconName="add-sharp"
      position="right"
      selected={props.display === 'new input display'}
      onPress={() => props.onPress_NewInputButton()}
      theme={{
        font: props.theme.font,
        background: props.theme.background,
      }}
    />
  </>);
}
