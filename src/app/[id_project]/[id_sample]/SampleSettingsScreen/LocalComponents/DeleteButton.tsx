import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function DeleteButton() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);
  const sampleSettings = useMemo(() => ProjectService.getSampleFromCache(id_sample), []);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [widgetName, setWidgetName] = useState<string>('');

  async function deleteProject() {
    await ProjectService.deleteSample(
      id_project,
      id_sample,
      async () => await useNavigate('PROJECT SCREEN', id_project),
      (errorMessage) => alert(errorMessage)
    );
  }

  function dismissModal() {
    setShowModal(false);
    setWidgetName('');
  }

  const isNameCorrect = widgetName === sampleSettings.name;

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
        color_Navbar={theme.wrong}
        color_onNavbar={theme.onWrong}
        onRequestClose={() => dismissModal()}
        ScreenButtons={
          <ScreenButtons
            isNameCorrect={isNameCorrect}
            onPress_back={() =>  dismissModal()}
            onPress_delete={async () => await deleteProject()}
          />
        }
      >
        <Layout.View
          style={{
            padding: 5,
            gap: 10,
          }}
        >
          {!isNameCorrect ? (<>
            <Layout.Input.String
              label={stringResources['Sample name']}
              backgroundColor={theme.background}
              color={theme.wrong}
              color_placeholder={theme.wrong}
              placeholder={`${stringResources['Type sample name perfectly to delete.']}`}
              value={widgetName}
              onChangeText={setWidgetName}
              locked={false}
              onResetPress={() => setWidgetName('')}
            />
            <Layout.View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Layout.Text.P
                style={{
                  color: theme.onBackground,
                  marginLeft: 10,
                  textAlignVertical: 'center',
                }}
              >
                {`${stringResources['Tip']}:`}
              </Layout.Text.P>
              <Layout.Text.P
                style={{
                  color: theme.onBackground,
                  marginRight: 10,
                  textAlignVertical: 'center',
                }}
              >
                {`"${sampleSettings.name}"`}
              </Layout.Text.P>
            </Layout.View>
          </>) : (
            <Layout.Text.P
              style={{
                color: theme.wrong,
                margin: 10,
                textAlignVertical: 'center',
              }}
            >
              {stringResources['Click on the bottom right button to confirm.']}
            </Layout.Text.P>
          )}
        </Layout.View>
      </Layout.Modal>
    )}
  </>);
}

function ScreenButtons(props: {
  isNameCorrect: boolean
  onPress_back: () => void
  onPress_delete: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.secondary}
          color={theme.onSecondary}
          onPress={props.onPress_back}
        />
      }
      button_right={props.isNameCorrect ? (
        <Layout.Button.IconRounded
          color_background={theme.wrong}
          color={theme.onWrong}
          iconName="checkmark-done-sharp"
          showPlusSign={false}
          onPress={props.onPress_delete}
        />
      ) : undefined}
    />
  );
}
