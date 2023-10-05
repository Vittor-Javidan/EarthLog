import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO } from '@Types/AppTypes';
import { translations } from '@Translations/index';
import { useTimeout } from '@Hooks/index';
import ThemeService from '@Services/ThemeService';
import CredentialService from '@Services/CredentialService';
import UtilService from '@Services/UtilService';
import ConfigService from '@Services/ConfigService';

import { Input } from '@Input/index';
import { Layout } from '@Layout/index';
import { WidgetLabelButton } from './WidgetLabelButton';
import { WidgetDeleteButton } from './WidgetDeleteButton';
import { WidgetSensitiveDataButton } from './WidgetSensitiveDataButton';
import AlertService from '@Services/AlertService';

export const CredentialWidget = memo((props: {
  credential: CredentialDTO
  onCredentialDelete: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.widgetThemes['light'], []);
  const R      = useMemo(() => translations.screen.credentialScreen[config.language], []);

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

  const onUserChange = useCallback((newUSer: string) => {
    setCredential(prev => ({ ...prev, user: newUSer}));
    setSaved(false);
  }, []);

  const onPasswordChange = useCallback((newPassword: string) => {
    setCredential(prev => ({ ...prev, password: newPassword}));
    setSaved(false);
  }, []);

  const onURLChange = useCallback((newURL: string) => {
    setCredential(prev => ({ ...prev, rootURL: newURL}));
    setSaved(false);
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
      <Input.String
        label={R['User']}
        value={credential.user}
        onTextChange={(newName) => onUserChange(newName)}
        placeholder={R['Write here your username...']}
        secureTextEntry={!showSensitiveInfo}
        theme={{
          background: theme.background,
          font: theme.font,
          font_placeholder: theme.font_placeholder,
        }}
      />
      <Input.String
        label={R['Password']}
        value={credential.password}
        onTextChange={(newPassword) => onPasswordChange(newPassword)}
        placeholder={R['Write here your password...']}
        secureTextEntry={!showSensitiveInfo}
        theme={{
          background: theme.background,
          font: theme.font,
          font_placeholder: theme.font_placeholder,
        }}
      />
      <Input.String
        label={R['URL']}
        value={credential.rootURL}
        onTextChange={(newURL) => onURLChange(newURL)}
        placeholder={R['Write here the server root URL...']}
        secureTextEntry={!showSensitiveInfo}
        theme={{
          background: theme.background,
          font: theme.font,
          font_placeholder: theme.font_placeholder,
        }}
      />
    </Layout.PseudoWidget>
  );
});

function useAutoSave(onSave: () => void, deps: [CredentialDTO, boolean]) {
  const [credential, saved] = deps;
  useTimeout(async () => {
    if (saved === false) {
      await CredentialService.updateCredential(credential);
      onSave();
    }
  }, [credential, saved], 200);
}
