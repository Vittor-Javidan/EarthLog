import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';
import { useNavigate } from '@Hooks/index';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function DeleteButton() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [widgetName, setWidgetName] = useState<string>('');

  async function deleteProject() {
    await ProjectService.deleteProject(
      id_project,
      async () => await useNavigate('HOME SCREEN'),
      (errorMessage) => alert(errorMessage)
    );
  }

  function dismissModal() {
    setShowModal(false);
    setWidgetName('');
  }

  const isNameCorrect = widgetName === projectSettings.name;

  return (<>
    <Layout.Button.IconRounded
      iconName="trash-outline"
      showPlusSign={false}
      color_background={theme.wrong}
      color={theme.onWrong}
      onPress={() => setShowModal(true)}
    />
    {showModal && (
      <Layout.Modal
        title={stringResources['Delete']}
        onRequestClose={() => dismissModal()}
      >
        <Layout.View
          style={{
            padding: 5,
            gap: 10,
          }}
        >
          {!isNameCorrect ? (<>
            <Layout.Input.String
              label={stringResources['Name']}
              backgroundColor={theme.background}
              color={theme.wrong}
              color_placeholder={theme.wrong}
              placeholder={`${stringResources['Type project name perfectly to delete.']}`}
              value={widgetName}
              onChangeText={setWidgetName}
              locked={false}
              onResetPress={() => setWidgetName('')}
            />
            <Layout.Text.P
              style={{
                color: theme.onBackground,
                marginLeft: 10,
                textAlignVertical: 'center',
              }}
            >
              {`${stringResources['Name']}: ${projectSettings.name}`}
            </Layout.Text.P>
          </>) : (
            <Layout.Text.P
              style={{
                color: theme.wrong,
                margin: 10,
                textAlignVertical: 'center',
              }}
            >
              Click on the bottom right button to confirm
            </Layout.Text.P>
          )}
        </Layout.View>
        <Layout.ScreenButtons
          button_right={isNameCorrect ? (
            <Layout.Button.IconRounded
              color_background={theme.wrong}
              color={theme.onWrong}
              iconName="checkmark-done-sharp"
              showPlusSign={false}
              onPress={async () => await deleteProject()}
            />
          ) : undefined}
        />
      </Layout.Modal>
    )}
  </>);
}
