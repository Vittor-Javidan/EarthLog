import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { CredentialDTO } from '@Types/AppTypes';
import CacheService from '@Services/CacheService';
import ConfigService from '@Services/ConfigService';
import HapticsService from '@Services/HapticsService';
import ThemeService from '@Services/ThemeService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';
import { translations } from '@Translations/index';

export const CredentialsDisplay = memo((props: {
  showDisplay: boolean
  onCredentialChoose: (credential: CredentialDTO) => void
}) => {

  const config     = useMemo(() => ConfigService.config, []);
  const R          = useMemo(() => translations.component.alert.uploadProject[config.language], []);

  const AllCredentialButtons = CacheService.allCredentials.map(credential => (
    <CredentialButton
      key={credential.credential_id}
      credential={credential}
      onPress={() => props.onCredentialChoose(credential)}
    />
  ));

  return props.showDisplay ? (<>
    <Text h3
      style={{
        textAlign: 'center',
      }}
    >
      {R['Upload this project to?']}
    </Text>
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
      }}
    >
      {AllCredentialButtons}
    </View>
  </>) : <></>;
});

const CredentialButton = memo((props: {
  credential: CredentialDTO
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
	const [pressed, setPressed] = useState<boolean>(false);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

	return (
		<Pressable
			onPressIn={() => onPressIn()}
			onPressOut={() => setPressed(false)}
			onPress={() => onPress()}
			style={{
        flexDirection: 'row',
        alignItems: 'center',
				paddingHorizontal: 15,
        paddingVertical: 4,
				backgroundColor: pressed ? theme.background_active : theme.background_Button,
        borderRadius: 100,
        gap: 5,
			}}
		>
      <Text p
				style={{
          color: theme.font_button,
				}}
			>
				{props.credential.name}
			</Text>
      <View
        style={{
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon
          iconName="card"
          color={theme.font_button}
        />
      </View>
		</Pressable>
  );
});
