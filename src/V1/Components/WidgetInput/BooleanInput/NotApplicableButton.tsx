import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import { ConfigService } from '@V1/Services/ConfigService';

import { Text } from '@V1/Text/index';
import { Button } from '@V1/Button/index';

export const NotApplicableButton = memo((props: {
  notApplicable: boolean | undefined
  theme: WidgetTheme
  onNotApplicableChange: (checked: boolean) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.boolean[config.language], []);

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
