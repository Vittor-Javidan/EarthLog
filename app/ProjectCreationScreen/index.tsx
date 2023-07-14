import React, { useMemo, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';

import AppRoutes from '@AppRoutes/Routes';
import ConfigService from '@Services/ConfigService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';
import { WidgetData } from '@Services/ProjectService';

import { Layout } from '@Components/Layout';
import { ProjectCreationScreenTranslations, languages } from './translations';
import API_ProjectCreation from './API_ProjectCreation';
import { Widget } from '@Widget/index';

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
        widgetData={API_ProjectCreation.temporaryProject.projectSettings.ID}
        onConfirm={(_, widgetData) => API_ProjectCreation.setProjectID(widgetData)}
      />
      <Widget.Text
        label={stringResources['Name']}
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
        widgets={API_ProjectCreation.temporaryProject.projectWidgets}
        showAddButton={true}
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
        widgets={API_ProjectCreation.temporaryProject.pointTemplate}
        showAddButton={true}
        onConfirm={onConfirm}
      />
    </Layout.View>
  );
}


function AllWidgets(props: {
  widgets: Record<string, WidgetData>
  showAddButton: boolean
  onConfirm: (oldlabel: string, newLabel: string, value: WidgetData) => void
}) {

  const allWidgetsComponents: JSX.Element[] = [];
  for (const key in props.widgets) {
    const widgetData = props.widgets[key];
    allWidgetsComponents.push(
      <Widget.Selector
        key={key}
        label={key}
        widgetData={widgetData}
        onConfirm={(newLabel, value) => props.onConfirm(key, newLabel, value)}
      />
    );
  }

  return (
    <>
      {allWidgetsComponents}
      {props.showAddButton && <AddWidgetButton />}
    </>
  );
}

function AddWidgetButton() {
  return (
    <Layout.Button
      title="Add"
      onPress={() => {}}
    />
  );
}
