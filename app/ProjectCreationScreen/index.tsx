import React, { useMemo, useState, useEffect, ReactNode } from 'react';
import { View } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

import AppRoutes from '@AppRoutes/Routes';
import ConfigService from '@Services/ConfigService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';
import { WidgetData, WidgetLabel } from '@Services/ProjectService';

import { Layout } from '@Components/Layout';
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

  return (
    <Layout.Root
      title={stringResources['Project creation']}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Layout.Icon.Home
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
          onPress={() => {}}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function Drawer() {
  return <></>;
}

function ProjectSettingsWidgets() {

  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  return (
    <Layout.View>
      <Layout.Text
        fontSize={ThemeService.FONTS.h2}
        color="onBackground"
      >
        {stringResources['Project settings']}
      </Layout.Text>
      <Widget.Boolean
        label={stringResources['Immutable']}
        widgetData={API_ProjectCreation.temporaryProject.projectSettings.Immutable}
        onConfirm={(_, widgetData) => API_ProjectCreation.setProjectImmutable(widgetData)}
      />
      <Widget.Text
        label={stringResources['ID']}
        widgets={API_ProjectCreation.temporaryProject.projectSettings}
        widgetData={API_ProjectCreation.temporaryProject.projectSettings.ID}
        onConfirm={(_, widgetData) => API_ProjectCreation.setProjectID(widgetData)}
      />
      <Widget.Text
        label={stringResources['Name']}
        widgets={API_ProjectCreation.temporaryProject.projectSettings}
        widgetData={API_ProjectCreation.temporaryProject.projectSettings.Name}
        onConfirm={(_, widgetData) => API_ProjectCreation.setProjectName(widgetData)}
      />
    </Layout.View>
  );
}

function ProjectWidgets() {

  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  function onConfirm(oldlabel: string, newLabel: string, value: WidgetData) {
    if ( oldlabel !== newLabel) {
      API_ProjectCreation.deleteProjectWidget(oldlabel);
    }
    API_ProjectCreation.modifyProjectWidget(newLabel, value);
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
      />
    </Layout.View>
  );
}

function PointWidgetTemplate() {

  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  function onConfirm(oldlabel: string, newLabel: string, value: WidgetData) {
    if ( oldlabel !== newLabel) {
      API_ProjectCreation.deletePointTemplateWidget(oldlabel);
    }
    API_ProjectCreation.modifyPointTemplateWidget(newLabel, value);
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
      />
    </Layout.View>
  );
}


function AllWidgets(props: {
  refreshSetterKey: string
  widgets: Record<WidgetLabel, WidgetData>
  onConfirm: (oldlabel: string, newLabel: string, value: WidgetData) => void
}) {

  const [_, refreshComponent] = useState<boolean>(false);

  API_ProjectCreation.refreshSetter[props.refreshSetterKey] = refreshComponent;

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
          refreshComponent(prev => !prev);
        }}
      />
    );
  }

  return (
    <>
      {allWidgetsComponents}
      <AddWidgetButton
        refreshSetterKey={props.refreshSetterKey}
        widgets={props.widgets}
      />
    </>
  );
}

function AddWidgetButton(props: {
  refreshSetterKey: string
  widgets: Record<WidgetLabel, WidgetData>
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

  function addTextWidget() {
    whenLabelValid(() => {
      props.widgets[label] = {
        type: 'string',
        value: '',
        rules: {
          allowLabelChange: true,
          allowValueChange: true,
        },
      };
      API_ProjectCreation.refreshSetter[props.refreshSetterKey](prev => !prev);
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
            value={label}
            onChangeText={setLabel}
          />
        </Layout.View>
        <Layout.ScrollView>
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
