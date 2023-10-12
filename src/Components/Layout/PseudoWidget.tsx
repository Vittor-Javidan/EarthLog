import React, { ReactNode, memo, useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';

import { Text } from '@Text/index';
import { translations } from '@Translations/index';
import { WidgetTheme } from '@Types/ProjectTypes';

export const PseudoWidget = memo((props: {
  saved: boolean
  children: ReactNode
  theme: WidgetTheme
  navbarIcons?: JSX.Element
}) => {
  return (
    <View
      style={{
        backgroundColor: props.theme.background,
        borderRadius: 10,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingLeft: 10,
          height: 40,
        }}
      >
        <SaveFeedback
          saved={props.saved}
          theme={props.theme}
        />
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {props.navbarIcons !== undefined && (
            props.navbarIcons
          )}
        </View>
      </View>
      <View
        style={{
          paddingBottom: 5,
          gap: 10,
        }}
      >
        {props.children}
      </View>
    </View>
  );
});

const SaveFeedback = memo((props: {
  saved: boolean
  theme: WidgetTheme
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.component.layout.pseudoWidget[config.language], []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <View
        style={{
          height: 12,
          width: 12,
          backgroundColor: props.saved ? props.theme.confirm : props.theme.warning,
          borderRadius: 6,
        }}
      />
      <Text p
        style={{
          color: props.theme.font,
        }}
      >
        {props.saved ? R['Saved'] : R['Saving...']}
      </Text>
    </View>
  );
});
