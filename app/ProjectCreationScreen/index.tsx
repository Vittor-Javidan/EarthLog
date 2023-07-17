import React, { useMemo, useState, useEffect, ReactNode } from 'react';
import { View } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

import AppRoutes from '@Globals/AppRoutes';
import ConfigService from '@Services/ConfigService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';
import { WidgetData, WidgetLabel } from '@Services/ProjectService';

import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import { Input } from '@Inputs/index';
import { Widget } from '@Widget/index';

import { ProjectCreationScreenTranslations, languages } from './translations';
import API_ProjectCreation from './API_ProjectCreation';

export default function ProjectCreationScreen() {

  const navigation = useNavigation();
  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      if (API_ProjectCreation.unsavedChanges) {
        API_ProjectCreation.reset();
      }
    });
  }, []);

  function onConfirm() {
    if (API_ProjectCreation.temporaryProject.projectSettings.ID === '') {
      alert('ID cannot be empty. This is your local database file name.');
      return;
    }
    API_ProjectCreation.reset();
    navController.push(AppRoutes.HOME);
  }

  return (
    <Layout.Root
      title={stringResources['Project creation']}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => navController.push(AppRoutes.HOME)}
        />,
      ]}
    >
      <Layout.ScrollView>
        <ProjectSettingsWidgets />
        <ProjectWidgets />
        <PointWidgetTemplate />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title={stringResources['Cancel']}
          overrideBackgroundColor={theme.wrong}
          overrideTextColor={theme.onWrong}
          onPress={() => {
            API_ProjectCreation.reset();
            navController.push(AppRoutes.HOME);
          }}
        />
        <Layout.Button
          title={stringResources['Confirm']}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => onConfirm()}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function Drawer() {
  return <></>;
}

function ProjectSettingsWidgets() {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);
  const idRegex = useMemo<RegExp>(() => /[^a-zA-Z0-9-]/g, []);

  const [immutable, setImmutable] = useState<boolean>(API_ProjectCreation.temporaryProject.projectSettings.Immutable);
  const [id, setId] = useState<string>(API_ProjectCreation.temporaryProject.projectSettings.ID);
  const [name, setName] = useState<string>(API_ProjectCreation.temporaryProject.projectSettings.Name);

  return (
    <Layout.View>
      <Layout.Text
        fontSize={ThemeService.FONTS.h2}
        color="onBackground"
      >
        {stringResources['Project settings']}
      </Layout.Text>
      <Input.Boolean
        label={stringResources['Immutable']}
        backgroundColor_Label={theme.secondary}
        backgroundColor_Value={theme.tertiary}
        color_Label={theme.onSecondary}
        color_Value={theme.onTertiary}
        value={immutable}
        onSwitchChange={(boolean) => {
          API_ProjectCreation.setProjectImmutable(boolean);
          setImmutable(boolean);
        }}
      />
      <Input.String
        label={stringResources['ID']}
        backgroundColor_Label={theme.secondary}
        backgroundColor_Value={theme.tertiary}
        color_Label={theme.onSecondary}
        color_Value={theme.onTertiary}
        color_Placeholder="#666"
        placeholder='Write an ID here... only numbers, letters and "-"'
        value={id}
        onChangeText={(text) => {
          const normalizedText = text.replace(idRegex, '');
          API_ProjectCreation.setProjectID(normalizedText);
          setId(normalizedText);
        }}
      />
      <Input.String
        label={stringResources['Name']}
        backgroundColor_Label={theme.secondary}
        backgroundColor_Value={theme.tertiary}
        color_Label={theme.onSecondary}
        color_Value={theme.onTertiary}
        color_Placeholder="#666"
        placeholder="Write the project name here..."
        value={name}
        onChangeText={(text) => {
          API_ProjectCreation.temporaryProject.projectSettings.Name = text;
          setName(text);
        }}
      />
    </Layout.View>
  );
}

function ProjectWidgets() {

  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  const [_, refresh] = useState<boolean>(false);

  function onConfirm(oldlabel: string, newLabel: string, value: WidgetData) {
    if ( oldlabel !== newLabel) {
      API_ProjectCreation.deleteProjectWidget(oldlabel);
    }
    API_ProjectCreation.modifyProjectWidget(newLabel, value);
  }

  function onCreateWidget(label: string, widgetData: WidgetData) {
    API_ProjectCreation.modifyProjectWidget(label, widgetData);
    refresh(prev => !prev);
  }

  return (
    <Layout.View>
      <Layout.Text
        fontSize={ThemeService.FONTS.h2}
        color="onBackground"
      >
        {stringResources['Project widgets']}
      </Layout.Text>
      <AllWidgets
        refreshSetterKey="ProjectWidgets"
        widgets={API_ProjectCreation.temporaryProject.projectWidgets}
        onConfirm={onConfirm}
        onCreateWidget={(label, widgetData) => onCreateWidget(label, widgetData)}
      />
    </Layout.View>
  );
}

function PointWidgetTemplate() {

  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  const [_, refresh] = useState<boolean>(false);

  function onConfirm(oldlabel: string, newLabel: string, value: WidgetData) {
    if ( oldlabel !== newLabel) {
      API_ProjectCreation.deletePointTemplateWidget(oldlabel);
    }
    API_ProjectCreation.modifyPointTemplateWidget(newLabel, value);
  }

  function onCreateWidget(label: string, widgetData: WidgetData) {
    API_ProjectCreation.modifyPointTemplateWidget(label, widgetData);
    refresh(prev => !prev);
  }

  return (
    <Layout.View>
      <Layout.Text
        fontSize={ThemeService.FONTS.h2}
        color="onBackground"
      >
        {stringResources['Point template']}
      </Layout.Text>
      <AllWidgets
        refreshSetterKey="PointWidgetTemplate"
        widgets={API_ProjectCreation.temporaryProject.pointTemplate}
        onConfirm={onConfirm}
        onCreateWidget={(label, widgetData) => onCreateWidget(label, widgetData)}
      />
    </Layout.View>
  );
}


function AllWidgets(props: {
  refreshSetterKey: string
  widgets: Record<WidgetLabel, WidgetData>
  onConfirm: (oldlabel: string, newLabel: string, value: WidgetData) => void
  onCreateWidget: (label: WidgetLabel, widgetData: WidgetData) => void
}) {

  const allWidgetsComponents: JSX.Element[] = [];
  for (const key in props.widgets) {
    const widgetData = props.widgets[key];
    allWidgetsComponents.push(
      <Widget.Selector
        key={key}
        label={key}
        widgetData={widgetData}
        widgets={props.widgets}
        onConfirm={(newLabel, value) => {
          props.onConfirm(key, newLabel, value);
        }}
      />
    );
  }

  return (
    <>
      {allWidgetsComponents}
      <AddWidgetButton
        widgets={props.widgets}
        onCreateWidget={(label, widgetData) => props.onCreateWidget(label, widgetData)}
      />
    </>
  );
}

function AddWidgetButton(props: {
  widgets: Record<WidgetLabel, WidgetData>
  onCreateWidget: (label: WidgetLabel, widgetData: WidgetData) => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const [showModal, setShowlModal] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('');

  function whenLabelValid(callback: () => void) {
    if (label === '') {
      alert('Label cannot be empty');
      return;
    }
    if (Object.keys(props.widgets).includes(label)) {
      alert('Label cannot be duplicated');
      return;
    }
    callback();
  }

  function addBooleandWidget() {
    whenLabelValid(() => {
      props.onCreateWidget(label, {
        type: 'boolean',
        value: false,
        rules: {
          allowLabelChange: true,
          allowValueChange: true,
        },
      });
    });
  }

  function addTextWidget() {
    whenLabelValid(() => {
      props.onCreateWidget(label, {
        type: 'string',
        value: '',
        rules: {
          allowLabelChange: true,
          allowValueChange: true,
        },
      });
    });
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  function ButtonContainer(props: { children: ReactNode }) {
    return <View style={{ height: 60 }}>{props.children}</View>;
  }

  return (<>
    <Layout.Button
      title="Add"
      onPress={() => setShowlModal(true)}
    />
    {showModal && (
      <Layout.Modal
        title="Add Widget"
        onRequestClose={() => setShowlModal(false)}
      >
        <Layout.View>
          <Input.String
            label="Label name"
            backgroundColor_Label={theme.tertiary}
            backgroundColor_Value={theme.background}
            color_Label={theme.onTertiary}
            color_Value={theme.onBackground}
            color_Placeholder={'#444'}
            placeholder={'give a name to the widget here...'}
            value={label}
            onChangeText={setLabel}
          />
        </Layout.View>
        <Layout.ScrollView>
          <ButtonContainer>
            <Layout.Button
              title="Boolean Widget"
              overrideBackgroundColor={theme.tertiary}
              overrideTextColor={theme.onTertiary}
              onPress={() => {
                addBooleandWidget();
                setLabel('');
                setShowlModal(false);
              }}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Layout.Button
              title="Text Widget"
              overrideBackgroundColor={theme.tertiary}
              overrideTextColor={theme.onTertiary}
              onPress={() => {
                addTextWidget();
                setLabel('');
                setShowlModal(false);
              }}
            />
          </ButtonContainer>
        </Layout.ScrollView>
      </Layout.Modal>
    )}
  </>);
}
