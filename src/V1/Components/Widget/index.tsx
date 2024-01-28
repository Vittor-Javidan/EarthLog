import React, { useMemo, useState, memo, useCallback, useTransition } from 'react';
import { View } from 'react-native';

import { deepCopy } from '@V1/Globals/DeepCopy';
import { ThemeNames_Widgets } from '@V1/Types/AppTypes';
import { GPS_DTO, InputData, WidgetData, WidgetDisplay, WidgetScope, WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import { useTimeout } from '@V1/Hooks/index';
import ProjectService from '@V1/Services/ProjectService';
import ConfigService from '@V1/Services/ConfigService';
import AlertService from '@V1/Services/AlertService';
import ThemeService from '@V1/Services/ThemeService';
import CacheService from '@V1/Services/CacheService';
import MediaService from '@V1/Services/MediaService';

import { Animation } from '@V1/Animation/index';
import { Navbar } from './Navbar';
import { WidgetLabel } from './WidgetLabel';
import { DataDisplay } from './DataDisplay';
import { NewInputDisplay } from './NewInputDisplay';
import { ThemeDisplay } from './ThemeDisplay';
import { Footer } from './Footer';

export const Widget = memo((props: {
  widgetData: WidgetData
  widgetScope: WidgetScope
  referenceGPSData: GPS_DTO | undefined
  onDeleteWidget: () => void
}) => {

  const config                         = useMemo(() => ConfigService.config, []);
  const R                              = useMemo(() => translations.widget.Root[config.language], []);
  const defaultTheme                   = useMemo(() => ThemeService.widgetThemes[config.widgetTheme], []);
  const [_         , startTransitions] = useTransition();
  const [widgetData, setWidgetData   ] = useState<WidgetData>(deepCopy(props.widgetData));
  const [editInputs, setEditInputs   ] = useState<boolean>(false);
  const [saved     , setSaved        ] = useState<boolean>(true);
  const [display   , setDisplay      ] = useState<WidgetDisplay>(widgetData.inputs.length <= 0 ? 'new input display' : 'data display');
  const widgetTheme                    = useMemo<WidgetTheme>(() => ({
    font:             widgetData.widgetTheme?.font             ?? defaultTheme.font,
    font_placeholder: widgetData.widgetTheme?.font_placeholder ?? defaultTheme.font_placeholder,
    background:       widgetData.widgetTheme?.background       ?? defaultTheme.background,
    wrong:            widgetData.widgetTheme?.wrong            ?? defaultTheme.wrong,
    confirm:          widgetData.widgetTheme?.confirm          ?? defaultTheme.confirm,
    warning:          widgetData.widgetTheme?.warning          ?? defaultTheme.warning,
    disabled:         widgetData.widgetTheme?.disabled         ?? defaultTheme.disabled,
  }), [widgetData.widgetTheme]);

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

  const onLabelChange = useCallback((label: string) => {
    setSaved(false);
    setWidgetData(prev => ({ ...prev, widgetName: label }));
  }, []);

  const onThemeChange = useCallback((themeName: ThemeNames_Widgets) => {
    setSaved(false);
    setWidgetData(prev => ({
      ...prev,
      widgetTheme: deepCopy(ThemeService.widgetThemes[themeName]),
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

  const onMoveUp = useCallback((id_input: string) => {
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

  const onMoveDown = useCallback((id_input: string) => {
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

  const onInputDelete = useCallback(async (id_input: string) => {
    await AlertService.handleAlert(true, {
      type: 'warning',
      question: R['This will delete any info or media related to this field. This action is permanent and cannot be undone.'],
    }, async () => {
      const { id_project } = props.widgetScope;
      const newData: WidgetData = { ...widgetData };
      for (let i = 0; i < newData.inputs.length; i++) {
        if (newData.inputs[i].id_input === id_input) {
          await MediaService.deleteMediaRecursively({
            scope: 'input',
            id_project: id_project,
            input: newData.inputs.splice(i, 1)[0],
          });
          break;
        }
      }
      setSaved(false);
      setWidgetData(newData);
    });
  }, [widgetData]);

  const onWidgetDelete = useCallback(() => {
    AlertService.handleAlert(true, {
      question: R['This will delete any info or media related to this wiget. This action is permanent and cannot be undone.'],
      type: 'warning',
    },() => props.onDeleteWidget());
  }, [props.onDeleteWidget]);

  const onAddToNewSamplesChange = useCallback((boolean: boolean) => {
    setSaved(false);
    setWidgetData(prev => ({ ...prev, addToNewSamples: boolean }));
  }, []);

  useAutoSave_widget(() => {
    setSaved(true);
  }, [widgetData, props.widgetScope, saved]);

  return (
    <Animation.FadeOut
      duration={300}
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
          paddingTop: 20,
          gap: 10,
        }}
      >
        <View
          style={{
            paddingBottom: 5,
            gap: 20,
          }}
        >
          <WidgetLabel
            label={widgetData.widgetName}
            allowWidgetNameChange={widgetData.rules.allowWidgetNameChange}
            onLabelChange={(label) => onLabelChange(label)}
            theme={widgetTheme}
          />
          {display === 'data display' && (<>
            <DataDisplay
              widgetScope={props.widgetScope}
              inputs={widgetData.inputs}
              editInputs={editInputs}
              referenceGPSData={props.referenceGPSData}
              onSave={(inputData) => updateInput(inputData)}
              onInputDelete={async (id_input) => await onInputDelete(id_input)}
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
          onDeleteWidget={() => onWidgetDelete()}
          rules={widgetData.rules}
          theme={widgetTheme}
        />
      </View>
    </Animation.FadeOut>
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
        await ProjectService.updateWidget({
          path: 'project widgets',
          id_project: widgetScope.id_project,
          widgetData: widgetData,
          sync: true,
          onSuccess: () => {
            CacheService.updateCache_ProjectWidget({ widgetData });
            onSave();
          },
          onError: (erroMessage) => alert(erroMessage),
        });
        break;
      }

      case 'template': {
        await ProjectService.updateWidget({
          path: 'template widgets',
          id_project: widgetScope.id_project,
          widgetData: widgetData,
          sync: true,
          onSuccess: () => {
            CacheService.updateCache_TemplateWidget({ widgetData });
            onSave();
          },
          onError: (erroMessage) => alert(erroMessage),
        });
        break;
      }

      case 'sample': {
        await ProjectService.updateWidget({
          path: 'sample widgets',
          id_project: widgetScope.id_project,
          id_sample: widgetScope.id_sample,
          widgetData: widgetData,
          sync: true,
          onSuccess: () => {
            CacheService.updateCache_SampleWidget({ widgetData });
            onSave();
          },
          onError: (erroMessage) => alert(erroMessage),
        });
        break;
      }
    }

  }, [widgetData, widgetScope], 200);
}
