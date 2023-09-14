import React, { useMemo } from 'react';

import ConfigService from '@Services/ConfigService';

import View from '../View';
import { Icon } from '../Icon';
import TextWithIcon from '../Button/TextWithIcon';
import RootText from '../Text/Root';

export default function SampleUI(props: {
  title_label: string
  title_button: string
  onPress_Open: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        backgroundColor: theme.secondary,
        borderRadius: 10,
      }}
    >
      <Label
        title_label={props.title_label}
      />
      <Button
        title_button={props.title_button}
        onPress_Open={props.onPress_Open}
      />
      <Footer />
    </View>
  );
}

function Label(props: {
  title_label: string
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
          paddingLeft: 10,
        }}
      >
        <Icon
          iconName="clipboard"
          color={theme.onSecondary}
        />
      </View>
      <RootText
        style={{
          textAlignVertical: 'center',
          fontSize: 200,
          color: theme.onSecondary,
          maxWidth: '90%',
          paddingVertical: 5,
          paddingRight: 10,
        }}
      >
        {props.title_label}
      </RootText>
    </View>
  );
}

function Button(props: {
  title_button: string
  onPress_Open: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        alignItems: 'flex-start',
      }}
    >
      <TextWithIcon
        title={props.title_button}
        onPress={props.onPress_Open}
        color_background={theme.tertiary}
        color_font={theme.onTertiary}
        iconName="arrow-forward-sharp"
        iconSide="Right"
      />
    </View>
  );
}

function Footer() {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        height: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
      }}
    >
      <RootText
        style={{
          color: theme.onSecondary,
          fontSize: 200,
        }}
      >
        Last Edit Date
      </RootText>
    </View>
  );
}
