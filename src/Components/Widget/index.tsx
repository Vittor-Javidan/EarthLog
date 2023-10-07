import React, { useMemo, useState, memo, useCallback, useTransition } from 'react';
import { View } from 'react-native';

import { ThemeNames_Widgets } from '@Types/AppTypes';
import { GPS_DTO, ID, InputData, InputStatus, WidgetData, WidgetDisplay, WidgetScope, WidgetThemeDTO } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import UtilService from '@Services/UtilService';
import ProjectService from '@Services/ProjectService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';

import { Navbar } from './Navbar';
import { LabelButton } from './LabelButton';
import { DataDisplay } from './AllInputs';
import { NewInputDisplay } from './NewInputDisplay';
import { Footer } from './Footer';
import { ThemeDisplay } from './ThemeDisplay';
import { useLocalSearchParams } from 'expo-router';
import CacheService from '@Services/CacheService';

export const Widget = memo((props: {
  widgetData: WidgetData
  widgetScope: WidgetScope
  referenceGPSData: GPS_DTO | undefined
  onDeleteWidget: () => void
}) => {

  const id_project = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const R               = useMemo(() => translations.widget.Root[config.language], []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);
  const [_, startTransitions] = useTransition();

  const [widgetData     , setWidgetData     ] = useState<WidgetData>(UtilService.deepCopy(props.widgetData));
  const [tempLabel      , setTempLabel      ] = useState<string>(widgetData.widgetName);
  const [editLabel      , setEditLabel      ] = useState<boolean>(false);
  const [editInputs     , setEditInputs     ] = useState<boolean>(false);
  const [saved          , setSaved          ] = useState<boolean>(true);
  const [display        , setDisplay        ] = useState<WidgetDisplay>('data display');

  const defaultTheme = useMemo(() => ThemeService.widgetThemes['light'], []);
  const widgetTheme  = useMemo<WidgetThemeDTO>(() => ({
    font:             widgetData.widgetTheme?.font             ?? defaultTheme.font,
    font_placeholder: widgetData.widgetTheme?.font_placeholder ?? defaultTheme.font_placeholder,
    background:       widgetData.widgetTheme?.background       ?? defaultTheme.background,
    wrong:            widgetData.widgetTheme?.wrong            ?? defaultTheme.wrong,
    confirm:          widgetData.widgetTheme?.confirm          ?? defaultTheme.confirm,
    modified:         widgetData.widgetTheme?.modified         ?? defaultTheme.modified,
    disabled:         widgetData.widgetTheme?.disabled         ?? defaultTheme.disabled,
  }), [widgetData.widgetTheme]);

  const onLabelChange = useCallback((label: string) => {
    setTempLabel(label);
    setSaved(false);
  }, []);

  const selectDisplay = useCallback((newDisplay: WidgetDisplay) => {
    startTransitions(() => {
      if (display === newDisplay) {
        setDisplay('data display');
        return;
      }
      setDisplay(newDisplay);
    });
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

  const save = useCallback(async (widgetData: WidgetData) => {

    // TODO: extract this save function to outside this component. This will become a autosaveHook in the futures.

    if (projectSettings.status === 'uploaded') {
      projectSettings.status = 'modified';
      await ProjectService.updateProject(
        projectSettings,
        () => CacheService.updateCache_ProjectSettings(projectSettings),
        (erroMessage) => alert(erroMessage)
      );
    }

    switch (props.widgetScope.type) {

      case 'project': {
        await ProjectService.updateWidget_Project(
          props.widgetScope.id_project,
          widgetData,
          () => setSaved(true),
          (erroMessage) => alert(erroMessage)
        ); break;
      }

      case 'template': {
        await ProjectService.updateWidget_Template(
          props.widgetScope.id_project,
          widgetData,
          () => setSaved(true),
          (erroMessage) => alert(erroMessage)
        ); break;
      }

      case 'sample': {
        await ProjectService.updateWidget_Sample(
          props.widgetScope.id_project,
          props.widgetScope.id_sample,
          widgetData,
          () => setSaved(true),
          (erroMessage) => alert(erroMessage)
        ); break;
      }
    }

  }, [props.widgetScope]);

  const onEditLabel = useCallback(() => {
    if (widgetData.rules.allowWidgetNameChange) {
      setEditLabel(true);
    }
  }, []);

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
    AlertService.handleAlert(true, {
      question: R['Confirm to delete this widget.'],
      type: 'warning',
    },() => props.onDeleteWidget());
  }, [props.onDeleteWidget]);

  const onDelete = useCallback((id_input: ID) => {
    AlertService.handleAlert(true, {
      type: 'warning',
      question: R['Confirm to delete this field.'],
    }, () => {
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
    });
  }, [save]);

  const onThemeChange = useCallback((themeName: ThemeNames_Widgets) => {
    setSaved(false);
    setWidgetData(prev => {
      const newData: WidgetData = { ...prev, widgetTheme: UtilService.deepCopy(ThemeService.widgetThemes[themeName])};
      save(newData);
      return newData;
    });
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
        isTemplate={props.widgetScope.type === 'template'}
        display={display}
        editInputs={editInputs}
        onPress_DataDisplayButton={() => togleDataDisplay()}
        onPress_EditButton={() => togleEditDisplay()}
        onPress_ThemeButton={() => togleThemeDisplay()}
        onPress_NewInputButton={() => togleNewInputDisplay()}
        rules={widgetData.rules}
        theme={widgetTheme}
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
            onPress={() => onEditLabel()}
            onConfirm={() => onConfirmLabel()}
            onLabelChange={(label) => onLabelChange(label)}
            theme={widgetTheme}
          />
          {display === 'data display' && (<>
            <DataDisplay
              inputs={widgetData.inputs}
              editInputs={editInputs}
              referenceGPSData={props.referenceGPSData}
              onSave={(inputData, status) => onConfirmInput(inputData, status)}
              onInputDelete={(id_input) => onDelete(id_input)}
              onInputMoveUp={(id_input) => onMoveUp(id_input)}
              onInputMoveDow={(id_input) => onMoveDown(id_input)}
              rules={widgetData.rules}
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
              onThemeSelected={(themeName) => onThemeChange(themeName)}
            />
          )}
        </View>
        <Footer
          editInputs={editInputs}
          isTemplate={props.widgetScope.type === 'template'}
          addToNewSamples={widgetData.addToNewSamples ?? false}
          onChangeCheckbox={(checked) => onAddToNewSamplesChange(checked)}
          onDeleteWidget={() => deleteWidget()}
          rules={widgetData.rules}
          theme={widgetTheme}
        />
      </View>
    </View>
  );
});
