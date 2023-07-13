import React, { useMemo, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';

import AppRoutes from '@AppRoutes/Routes';
import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
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
      title={stringResources['Project Creation']}
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
        <ProjectInfoInputs />
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

function ProjectInfoInputs() {

  const [_, refresh] = useState<boolean>(false);
  API_ProjectCreation.refreshSetters['ProjectInfoInputs'] = refresh;

  return (
    <Layout.View>
      <Layout.Text
        fontSize={24}
        color="onBackground"
      >
        Project Info
      </Layout.Text>
      <Widget.Boolean
        label={'Immutable'}
        onBooleanChange={(boolean) => {
          API_ProjectCreation.setImmutable({ type: 'boolean', value: boolean });
          refresh(prev => !prev);
        }}
      />
      <Widget.Text
        label="ID"
        widgetData={API_ProjectCreation.temporaryProject.ID}
        onConfirm={(_, value) => {
          API_ProjectCreation.setID(value);
          refresh(prev => !prev);
        }}
      />
      <Widget.Text
        label="Name"
        widgetData={API_ProjectCreation.temporaryProject.Name}
        onConfirm={(_, value) => {
          API_ProjectCreation.setName(value);
          refresh(prev => !prev);
        }}
      />
      <AllWidgets />
      <AddWidgetButton />
    </Layout.View>
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

function AllWidgets() {
  const allInputs: JSX.Element[] = [];
  for (const key in API_ProjectCreation.temporaryProject.projectWidgets) {
    const projectInfo = API_ProjectCreation.temporaryProject.projectWidgets[key];
    allInputs.push(
      <WidgetSelector
        key={key}
        label={key}
        projectInfo={projectInfo}
      />
    );
  }
  return <>{allInputs}</>;
}

function WidgetSelector(props: {
  label: string
  projectInfo: WidgetData
}) {

  function onConfirm(newLabel: string, value: WidgetData) {
    if ( props.label !== newLabel) {
      API_ProjectCreation.deleteProjectInfo(props.label);
    }
    API_ProjectCreation.modifyProjectInfo(newLabel, value);
    API_ProjectCreation.refreshSetters['ProjectInfoInputs'](prev => !prev);
  }

  switch (props.projectInfo.type) {
    case 'string': return (
      <Widget.Text
        label={props.label}
        widgetData={props.projectInfo}
        onConfirm={onConfirm}
      />
    );
    case 'boolean': return (<>
      {/* TODO: Add edit options, and change the event to onConfirm*/}
      <Widget.Boolean
        label={props.label}
        onBooleanChange={(boolean) => API_ProjectCreation.modifyProjectInfo(props.label, { type: 'boolean', value: boolean })}
      />
    </>);
  }
}
