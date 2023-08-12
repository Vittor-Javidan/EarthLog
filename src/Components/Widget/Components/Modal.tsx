import React, { useState, useMemo, ReactNode } from 'react';
import { Layout } from '@Components/Layout';

import { ThemeDTO, WidgetData } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function Modal(props: {
  title: string
  widgetData: WidgetData
  children: ReactNode
  onConfirm: () => void
  onDelete: () => void
  onRequestClose: () => void
}) {
  return (
    <Layout.Modal
      title={props.title}
      onRequestClose={props.onRequestClose}
      ScreenButtons={
        <ScreenButtons
          title={props.title}
          widgetData={props.widgetData}
          onConfirm={props.onConfirm}
          onDelete={props.onDelete}
          onRequestClose={props.onRequestClose}
        />
      }
    >
      <Layout.ScrollView
        style={{
          flex: 1,
          paddingTop: 20,
        }}
      >
        {props.children}
      </Layout.ScrollView>
    </Layout.Modal>
  );
}

function ScreenButtons(props: {
  title: string
  widgetData: WidgetData
  onConfirm: () => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const { rules } = props.widgetData;

  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.secondary}
          color={theme.onSecondary}
          onPress={props.onRequestClose}
        />
      }
      button_middle={rules.allowWidgetErase ? (
        <DeleteButton
          widgetLabel={props.title}
          onDelete={props.onDelete}
        />
      ) : undefined}
      button_right={
        <Layout.Button.IconRounded
          iconName="save"
          showPlusSign={false}
          color_background={theme.confirm}
          color={theme.onConfirm}
          onPress={props.onConfirm}
        />
      }
    />
  );
}

function DeleteButton(props: {
  widgetLabel: string
  onDelete: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo(() => translations.Widgets.Components.Modal[ConfigService.config.language], []);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [widgetName, setWidgetName] = useState<string>('');

  function dismissModal() {
    setShowModal(false);
    setWidgetName('');
  }

  const isNameCorrect = widgetName === props.widgetLabel;

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
          <ScreenButtons_Delete
            isNameCorrect={isNameCorrect}
            onPress_back={() => dismissModal()}
            onPress_delete={() => props.onDelete()}
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
              label={stringResources['Widget name']}
              backgroundColor={theme.background}
              color={theme.wrong}
              color_placeholder={theme.wrong}
              placeholder={`${stringResources['Type widget name perfectly to delete.']}`}
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
                {`"${props.widgetLabel}"`}
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

function ScreenButtons_Delete(props: {
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
          color_background={theme.secondary}
          color={theme.onSecondary}
          showPlusSign={false}
          onPress={props.onPress_back}
        />
      }
      button_right={props.isNameCorrect ? (
        <Layout.Button.IconRounded
          iconName="checkmark-done-sharp"
          color_background={theme.wrong}
          color={theme.onWrong}
          showPlusSign={false}
          onPress={props.onPress_delete}
        />
      ) : undefined}
    />
  );
}
