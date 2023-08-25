import React, { useMemo } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

export default function NavigationTree(props: {
  iconButtons: JSX.Element[]
}) {

  if (props.iconButtons === undefined) {
    return <></>;
  }

  const { theme } = useMemo(() => ConfigService.config, []);
  const tree: JSX.Element[] = [];

  for (let i = 0; i < props.iconButtons.length; i++) {
    tree.push(props.iconButtons[i]);
    if ( i !== props.iconButtons.length - 1) {
      tree.push(
        <Ionicons
          key={`treeIcon_Chevrn_${i + 1}`}
          name="chevron-forward"
          adjustsFontSizeToFit={true}
          maxFontSizeMultiplier={0}
          style={{
            color: theme.onPrimary,
            fontSize: ThemeService.FONTS.auto,
          }}
        />
      );
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.primary,
        borderColor: theme.secondary,
        height: 30,
        borderTopWidth: 1,
        gap: 5,
      }}
    >
      {tree}
    </View>
  );
}
