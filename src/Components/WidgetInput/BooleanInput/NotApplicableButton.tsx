import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';

type ButtonTheme = {
  font: string
  background: string
  confirm: string
}

export const NotApplicableButton = memo((props: {
  notApplicable: boolean | undefined
  theme: ButtonTheme
  onNotApplicableChange: (checked: boolean) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.booleanInput[config.language], []);

  return (<>
    {props.notApplicable !== undefined && (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Text h3
          style={{
            color: props.theme.font,
            fontWeight: '900',
          }}
        >
          {R['N/A:']}
        </Text>
        <Button.Checkbox
          value={props.notApplicable}
          onChange={(boolean) => props.onNotApplicableChange(boolean)}
          theme={props.theme}
        />
      </View>
    )}
  </>);
});
