import React, { memo } from 'react';
import { View } from 'react-native';

import {
  WidgetDisplay,
  WidgetRules,
  WidgetTheme
} from '@V2/Types';

import { IconName } from '@V2/Icon/index';
import { NavbarIconButton } from './NavbarIconButtons';
import { SaveFeedback } from './SaveFeedback';

export const Navbar = memo((props: {
  saved: boolean
  isTemplate: boolean
  display: WidgetDisplay
  rules: WidgetRules
  theme: WidgetTheme
  onPress_DataDisplayButton: () => void
  onPress_EditButton: () => void
  onPress_NewInputButton: () => void
  onPress_ThemeButton: () => void
}) => {

  const buttonsData: {
    iconName: IconName
    selected: boolean
    onPress: () => void
  }[] = [{
    iconName: 'pencil-sharp',
    selected: props.display === 'data display',
    onPress: () => props.onPress_DataDisplayButton(),
  }];

  if (
    props.isTemplate && props.rules.template_showOptionsButton ||
    !props.isTemplate && props.rules.showOptionsButton
  ) {
    buttonsData.push({
      iconName: 'options-outline',
      selected: props.display === 'edit input display',
      onPress: () => props.onPress_EditButton(),
    });
  }

  if (props.rules.showThemeButton) {
    buttonsData.push({
      iconName: 'color-palette',
      selected: props.display === 'theme display',
      onPress: () => props.onPress_ThemeButton(),
    });
  }

  if (props.rules.showAddInputButton) {
    buttonsData.push({
      iconName: 'add-sharp',
      selected: props.display === 'new input display',
      onPress: () => props.onPress_NewInputButton(),
    });
  }

  const Buttons = buttonsData.map((data, index) => {
    const isLastIndex = index === buttonsData.length - 1;
    return (
      <NavbarIconButton
        key={index}
        iconName={data.iconName}
        position={isLastIndex ? 'right' : 'other'}
        selected={data.selected}
        onPress={() => data.onPress()}
        theme={{
          font: props.theme.font,
          background: props.theme.background,
        }}
      />
    );
  });

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-start',
        }}
      >
        {Buttons}
      </View>
    </View>
  );
});
