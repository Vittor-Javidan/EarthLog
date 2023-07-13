import React, { useMemo, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';

import AppRoutes from '@AppRoutes/Routes';
import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';
import ProjectService, { ProjectInfoTypes } from '@Services/ProjectService';

import { Layout } from '@Components/Layout';
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
      title={stringResources['Project Creation']}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Layout.Icon.Home
          key="treeIcon_1"
          onPress={() => navController.push(AppRoutes.PROJECTS_SCREEN)}
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
            navController.push(AppRoutes.PROJECTS_SCREEN);
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
  return (
    <Layout.View>
      <Layout.Text
        fontSize={24}
        color="onBackground"
      >
        Project Info
      </Layout.Text>
      <AllProjectInputs />
      <AddInputButton />
    </Layout.View>
  );
}

function AllProjectInputs() {

  const [_, refresh] = useState<boolean>(false);
  API_ProjectCreation.refreshSetters['AllProjectInputs'] = refresh;

  const allInputs: JSX.Element[] = [];
  for (const key in API_ProjectCreation.temporaryProject.projectInfo) {
    const projectInfo = API_ProjectCreation.temporaryProject.projectInfo[key];
    allInputs.push(
      <ProjectInput
        key={key}
        label={key}
        projectInfo={projectInfo}
      />
    );
  }
  return <>{allInputs}</>;
}

function AddInputButton() {

  return (
    <Layout.Button
      title="Add"
      onPress={() => {}}
    />
  );
}

function ProjectInput(props: {
  label: string
  projectInfo: ProjectInfoTypes
}) {

  function onConfirm(newLabel: string, value: ProjectInfoTypes) {
    if ( props.label !== newLabel) {
      API_ProjectCreation.deleteProjectInfo(props.label);
    }
    API_ProjectCreation.modifyProjectInfo(newLabel, value);
    API_ProjectCreation.refreshSetters['AllProjectInputs'](prev => !prev);
  }

  function enableLabelEdit() {
    return !ProjectService.KEY_LABELS.includes(props.label);
  }

  switch (props.projectInfo.type) {
    case 'string': return (
      <Layout.Input.String
        label={props.label}
        enableLabelEdit={enableLabelEdit()}
        projectInfo={props.projectInfo}
        onConfirm={onConfirm}
      />
    );
    case 'boolean': return (<>
      {/* TODO: Add edit options, and change the event to onConfirm*/}
      <Layout.Input.Boolean
        label={props.label}
        onBooleanChange={(boolean) => API_ProjectCreation.modifyProjectInfo(props.label, { type: 'boolean', value: boolean })}
      />
    </>);
  }
}
