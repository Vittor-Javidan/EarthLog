import React, { useMemo } from 'react';
import View from '../View';
import Icon from '../Icon';

import ConfigService from '@Services/ConfigService';
import TextWithIcon from '../Button/TextWithIcon';
import RootText from '../Text/Root';

export default function SampleUI(props: {
  title_label: string
  title_button: string
  onPress_Open: () => void
}) {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  return (
    <View
      style={{
        backgroundColor: theme.primary,
        borderColor: theme.secondary,
        borderTopWidth: 1,
        borderBottomWidth: 1,
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

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

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
          justifyContent: 'flex-start',
          padding: 5,
          gap: 10,
        }}
      >
        <Icon
          iconName="clipboard"
        />
      </View>
      <RootText
        style={{
          textAlignVertical: 'center',
          fontSize: 200,
          color: theme.onPrimary,
          maxWidth: '90%',
          paddingRight: 5,
          paddingVertical: 5,
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

  return (
    <View
      style={{
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 1,
      }}
    >
      <TextWithIcon
        title={props.title_button}
        onPress={props.onPress_Open}
        iconName="arrow-forward-sharp"
        iconSide="Right"
      />
    </View>
  );
}

function Footer() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

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
          color: theme.onPrimary,
          fontSize: 200,
        }}
      >
        Last Edit Date
      </RootText>
    </View>
  );
}
