import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO } from '@Types/AppTypes';
import { StringInputData } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import { useTimeout } from '@Hooks/index';
import ThemeService from '@Services/ThemeService';
import CredentialService from '@Services/CredentialService';
import UtilService from '@Services/UtilService';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';

import { Layout } from '@Layout/index';
import { WidgetInput } from '@WidgetInput/index';
import { WidgetLabelButton } from './WidgetLabelButton';
import { WidgetDeleteButton } from './WidgetDeleteButton';
import { WidgetSensitiveDataButton } from './WidgetSensitiveDataButton';

export const CredentialWidget = memo((props: {
  credential: CredentialDTO
  onCredentialDelete: () => void
}) => {

  const config      = useMemo(() => ConfigService.config, []);
  const theme       = useMemo(() => ThemeService.widgetThemes[config.widgetTheme], []);
  const R           = useMemo(() => translations.screen.credential[config.language], []);
  const unusedProps = useMemo(() => ({
    editWidget:     false,
    isFirstInput:   false,
    isLastInput:    false,
    onInputDelete:  () => {},
    onInputMoveDow: () => {},
    onInputMoveUp:  () => {},
    widgetRules:    {},
  }), []);

  const [credential       , setCredential       ] = useState<CredentialDTO>(UtilService.deepCopy(props.credential));
  const [showSensitiveInfo, setShowSensitiveInfo] = useState<boolean>(false);
  const [saved            , setSaved            ] = useState<boolean>(true);
  const [editLabel        , setEditLabel        ] = useState<boolean>(false);

  useAutoSave(() => {
    setSaved(true);
  }, [credential, saved]);

  const onLabelChange = useCallback((newLabel: string) => {
    setCredential(prev => ({ ...prev, name: newLabel}));
    setSaved(false);
  }, []);

  const onSaveUser = useCallback((inputData: StringInputData) => {
    setSaved(false);
    setCredential(prev => ({ ...prev, user: inputData.value }));
  }, []);

  const onSavePassword = useCallback((inputData: StringInputData) => {
    setSaved(false);
    setCredential(prev => ({ ...prev, password: inputData.value }));
  }, []);

  const onSaveURL = useCallback((inputData: StringInputData) => {
    setSaved(false);
    setCredential(prev => ({ ...prev, rootURL: inputData.value }));
  }, []);

  const onDeleteCredential = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'warning',
      question: R['Confirm to delete this credential.'],
    }, () => props.onCredentialDelete());
  }, [props.onCredentialDelete]);

  return (
    <Layout.PseudoWidget

      saved={saved}
      theme={theme}

      navbarIcons={<>
        <WidgetSensitiveDataButton
          showSensitiveInfo={showSensitiveInfo}
          onPress={() => setShowSensitiveInfo(prev => !prev)}
          theme={{
            font: theme.font,
            background: theme.background,
          }}
        />
        <WidgetDeleteButton
          onPress={async () => onDeleteCredential()}
          theme={{
            font: theme.wrong,
            background: theme.background,
          }}
        />
      </>}
    >
      <WidgetLabelButton
        label={credential.name}
        editLabel={editLabel}
        theme={theme}
        onPress={() => setEditLabel(true)}
        onConfirm={() => setEditLabel(false)}
        onLabelChange={(newLabel) => onLabelChange(newLabel)}
      />
      <WidgetInput.String
        inputData={{
          id_input: '',
          label: R['User'],
          value: credential.user,
          type: 'string',
          placeholder: R['Write here your username...'],
          lockedLabel: true,
          lockedData: false,
        }}
        onSave={(inputData) => onSaveUser(inputData)}
        multiline={false}
        secureTextEntry={!showSensitiveInfo}
        theme={theme}
        {...unusedProps}
      />
      <WidgetInput.String
        inputData={{
          id_input: '',
          label: R['Password'],
          value: credential.password,
          type: 'string',
          placeholder: R['Write here your password...'],
          lockedLabel: true,
          lockedData: false,
        }}
        onSave={(inputData) => onSavePassword(inputData)}
        multiline={false}
        secureTextEntry={!showSensitiveInfo}
        theme={theme}
        {...unusedProps}
      />
      <WidgetInput.String
        inputData={{
          id_input: '',
          label: R['URL'],
          value: credential.rootURL,
          type: 'string',
          placeholder: R['Write here the server root URL...'],
          lockedLabel: true,
          lockedData: false,
        }}
        onSave={(inputData) => onSaveURL(inputData)}
        multiline={false}
        secureTextEntry={!showSensitiveInfo}
        theme={theme}
        {...unusedProps}
      />
    </Layout.PseudoWidget>
  );
});

function useAutoSave(onSave: () => void, deps: [CredentialDTO, boolean]) {

  const [credential, saved] = deps;

  useTimeout(async () => {

    if (saved) {
      return;
    }

    await CredentialService.updateCredential(credential);
    onSave();

  }, [credential], 200);
}
