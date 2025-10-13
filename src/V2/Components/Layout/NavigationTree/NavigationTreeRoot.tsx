import React, { useMemo, memo } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

export const NavigationTreeRoot = memo((props: {
  iconButtons: React.JSX.Element[]
}) => {

  if (props.iconButtons === undefined) {
    return <></>;
  }

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.navigationTree, []);
  const tree: React.JSX.Element[] = [];

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
            color: theme.font,
            fontSize: 200,
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
        backgroundColor: theme.background,
        borderColor: theme.border,
        height: 20,
        paddingHorizontal: 1,
        paddingVertical: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        gap: 5,
      }}
    >
      {tree}
    </View>
  );
});
