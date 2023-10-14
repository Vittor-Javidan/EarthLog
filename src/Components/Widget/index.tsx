import React, { useMemo, useState, memo, useCallback, useTransition } from 'react';
import { View } from 'react-native';

import { ThemeNames_Widgets } from '@Types/AppTypes';
import { GPS_DTO, ID, InputData, WidgetData, WidgetDisplay, WidgetScope, WidgetTheme } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import { useTimeout } from '@Hooks/index';
import UtilService from '@Services/UtilService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import ProjectService from '@Services/ProjectService';
import SyncService from '@Services/SyncService';

import { Navbar } from './Navbar';
import { LabelButton } from './LabelButton';
import { DataDisplay } from './AllInputs';
import { NewInputDisplay } from './NewInputDisplay';
import { Footer } from './Footer';
import { ThemeDisplay } from './ThemeDisplay';

export const Widget = memo((props: {
  widgetData: WidgetData
  widgetScope: WidgetScope
  referenceGPSData: GPS_DTO | undefined
  onDeleteWidget: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widget.Root[config.language], []);
  const [_, startTransitions] = useTransition();

  const [widgetData     , setWidgetData     ] = useState<WidgetData>(UtilService.deepCopy(props.widgetData));
  const [tempLabel      , setTempLabel      ] = useState<string>(widgetData.widgetName);
  const [editLabel      , setEditLabel      ] = useState<boolean>(false);
  const [editInputs     , setEditInputs     ] = useState<boolean>(false);
  const [saved          , setSaved          ] = useState<boolean>(true);
  const [display        , setDisplay        ] = useState<WidgetDisplay>('data display');

  const defaultTheme = useMemo(() => ThemeService.widgetThemes[config.widgetTheme], []);
  const widgetTheme  = useMemo<WidgetTheme>(() => ({
    font:             widgetData.widgetTheme?.font             ?? defaultTheme.font,
    font_placeholder: widgetData.widgetTheme?.font_placeholder ?? defaultTheme.font_placeholder,
    background:       widgetData.widgetTheme?.background       ?? defaultTheme.background,
    wrong:            widgetData.widgetTheme?.wrong            ?? defaultTheme.wrong,
    confirm:          widgetData.widgetTheme?.confirm          ?? defaultTheme.confirm,
    warning:          widgetData.widgetTheme?.warning          ?? defaultTheme.warning,
    disabled:         widgetData.widgetTheme?.disabled         ?? defaultTheme.disabled,
  }), [widgetData.widgetTheme]);

  useAutoSave_widget(() => {
    setSaved(true);
  }, [widgetData, props.widgetScope, saved]);

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

  const onEditLabel = useCallback(() => {
    if (widgetData.rules.allowWidgetNameChange) {
      setEditLabel(true);
    }
  }, []);

  const onLabelChange = useCallback((label: string) => {
    setSaved(false);
    setTempLabel(label);
  }, []);

  const onConfirmLabel = useCallback(() => {
    setEditLabel(false);
    setWidgetData(prev => ({ ...prev, widgetName: tempLabel }));
    setSaved(false);
  }, [tempLabel]);

  const onThemeChange = useCallback((themeName: ThemeNames_Widgets) => {
    setSaved(false);
    setWidgetData(prev => ({
      ...prev,
      widgetTheme: UtilService.deepCopy(ThemeService.widgetThemes[themeName]),
    }));
  }, []);

  const onCreateInput = useCallback((inputData: InputData) => {
    setSaved(false);
    setWidgetData(prev => ({
      ...prev,
      inputs: [...prev.inputs, inputData],
    }));
    togleNewInputDisplay();
  }, [togleNewInputDisplay]);

  const updateInput = useCallback((inputData: InputData) => {
    setSaved(false);
    setWidgetData(prev => {
      for (let i = 0; i < prev.inputs.length; i++) {
        if ( prev.inputs[i].id_input === inputData.id_input) {
          prev.inputs[i] = inputData;
        }
      }
      return { ...prev };
    });
  }, []);

  const onMoveUp = useCallback((id_input: ID) => {
    setSaved(false);
    setWidgetData(prev => {
      for (let i = 0; i < prev.inputs.length; i++) {
        if (prev.inputs[i].id_input === id_input) {
          const tempInput    = prev.inputs[i - 1];
          prev.inputs[i - 1] = prev.inputs[i];
          prev.inputs[i]     = tempInput;
          break;
        }
      }
      return { ...prev };
    });
  }, []);

  const onMoveDown = useCallback((id_input: ID) => {
    setSaved(false);
    setWidgetData(prev => {
      for (let i = 0; i < prev.inputs.length; i++) {
        if (prev.inputs[i].id_input === id_input) {
          const tempInput    = prev.inputs[i + 1];
          prev.inputs[i + 1] = prev.inputs[i];
          prev.inputs[i]     = tempInput;
          break;
        }
      }
      return { ...prev };
    });
  }, []);

  const onDelete = useCallback((id_input: ID) => {
    AlertService.handleAlert(true, {
      type: 'warning',
      question: R['Confirm to delete this field.'],
    }, () => {
      setSaved(false);
      setWidgetData(prev => {
        for (let i = 0; i < prev.inputs.length; i++) {
          if (prev.inputs[i].id_input === id_input) {
            prev.inputs.splice(i, 1);
            break;
          }
        }
        return { ...prev };
      });
    });
  }, []);

  const deleteWidget = useCallback(() => {
    AlertService.handleAlert(true, {
      question: R['Confirm to delete this widget.'],
      type: 'warning',
    },() => props.onDeleteWidget());
  }, [props.onDeleteWidget]);

  const onAddToNewSamplesChange = useCallback((boolean: boolean) => {
    setSaved(false);
    setWidgetData(prev => ({ ...prev, addToNewSamples: boolean }));
  }, []);

  return (
    <View
      style={{
        backgroundColor: widgetTheme.background,
        borderRadius: 10,
        elevation: 3,
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
              onSave={(inputData) => updateInput(inputData)}
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

/**
 * widget data processing before saving.
 * Each time a new data comes before a 200ms interval, it discards the old data to save the updated
 * version.
 */
function useAutoSave_widget(onSave: () => void, deps: [WidgetData, WidgetScope, boolean]) {

  const [widgetData, widgetScope, saved] = deps;

  useTimeout(async () => {

    if (saved) {
      return;
    }

    switch (widgetScope.type) {

      case 'project': {

        const { id_project } = widgetScope;
        const { id_widget } = widgetData;

        await ProjectService.updateWidget_Project(id_project, widgetData,
          async () => {
            CacheService.updateCache_ProjectWidget(widgetData);
            await SyncService.syncData_ProjectWidgets(id_project, id_widget, 'updating');
            onSave();
          },
          (erroMessage) => alert(erroMessage)
        );

        break;
      }

      case 'template': {

        const { id_project } = widgetScope;
        const { id_widget } = widgetData;

        await ProjectService.updateWidget_Template(widgetScope.id_project, widgetData,
          async () => {
            CacheService.updateCache_TemplateWidget(widgetData);
            await SyncService.syncData_TemplateWidgets(id_project, id_widget, 'updating');
            onSave();
          },
          (erroMessage) => alert(erroMessage)
        );

        break;
      }

      case 'sample': {

        const { id_project, id_sample } = widgetScope;
        const { id_widget } = widgetData;

        await ProjectService.updateWidget_Sample(id_project, id_sample, widgetData,
          async () => {
            CacheService.updateCache_SampleWidget(widgetData);
            await SyncService.syncData_SampleWidgets(id_project, id_sample, id_widget, 'updating');
            onSave();
          },
          (erroMessage) => alert(erroMessage)
        );

        break;
      }
    }

  }, [widgetData, widgetScope], 200);
}
