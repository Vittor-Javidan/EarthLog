import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { deepCopy } from '@V1/Globals/DeepCopy';
import { CredentialDTO } from '@V1/Types/AppTypes';
import { StringInputData } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import { useTimeout } from '@V1/Hooks/index';
import { CredentialService } from '@V1/Services/CredentialService';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';
import { AlertAPI } from '@V1/Layers/API/Alert';

import { Layout } from '@V1/Layout/index';
import { WidgetInput } from '@V1/WidgetInput/index';
import { WidgetLabel } from './WidgetLabel';
import { WidgetDeleteButton } from './WidgetDeleteButton';
import { WidgetSensitiveDataButton } from './WidgetSensitiveDataButton';

export const CredentialWidget = memo((props: {
  credential: CredentialDTO
  onCredentialDelete: () => void
}) => {

  const config                                    = useMemo(() => ConfigService.config, []);
  const theme                                     = useMemo(() => ThemeService.widgetThemes[config.widgetTheme], []);
  const R                                         = useMemo(() => translations.screen.credential[config.language], []);
  const unusedProps                               = useMemo(() => ({
    editWidget:     false,
    isFirstInput:   false,
    isLastInput:    false,
    onInputDelete:  () => {},
    onInputMoveDow: () => {},
    onInputMoveUp:  () => {},
    widgetRules:    {},
  }), []);
  const [credential       , setCredential       ] = useState<CredentialDTO>(deepCopy(props.credential));
  const [showSensitiveInfo, setShowSensitiveInfo] = useState<boolean>(false);
  const [saved            , setSaved            ] = useState<boolean>(true);

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
    await AlertAPI.handleAlert(true, {
      type: 'warning',
      question: R['Confirm to delete this credential.'],
    }, () => props.onCredentialDelete());
  }, [props.onCredentialDelete]);

  useAutoSave(() => {
    setSaved(true);
  }, [credential, saved]);

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
      <View
        style={{
          paddingTop: 20,
          gap: 15,
        }}
      >
        <WidgetLabel
          label={credential.name}
          theme={theme}
          onLabelChange={(newLabel) => onLabelChange(newLabel)}
        />
        <View
          style={{ gap: 20 }}
        >
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
        </View>
      </View>
    </Layout.PseudoWidget>
  );
});

function useAutoSave(onSave: () => void, deps: [CredentialDTO, boolean]) {

  const [credential, saved] = deps;

  useTimeout(async () => {

    if (saved) {
      return;
    }

    credential.rootURL = convertProtocolToLowerCase(credential.rootURL);
    await CredentialService.updateCredential({ credential });

    onSave();

  }, [credential], 200);
}

function convertProtocolToLowerCase(url: string): string {
  const urlParts = url.split('://');
  if (urlParts.length === 2) {
    const protocol = urlParts[0].toLowerCase();
    const restOfUrl = urlParts[1];
    return `${protocol}://${restOfUrl}`;
  }
  return url;
}
