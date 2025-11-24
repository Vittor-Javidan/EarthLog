import React, { memo, useMemo } from "react"
import { View } from "react-native"

import {
  SampleMapScope
} from "@V2/Types"

import { translations } from "@V2/Translations/index"
import { ThemeService } from "@V2/Services_Core/ThemeService"
import { ConfigService } from "@V2/Services/ConfigService"
import { CacheService } from "@V2/Services/CacheService"
import { Text } from "@V2/Text/index"

export const MapLabel_Sample = memo((props: {
  scope: SampleMapScope
}) => {

  const { scope } = props
  const { id_sample } = scope;
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.layers.map[config.language], []);
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache({ id_sample }), []);

  return (
    <View
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 21,
        backgroundColor: theme.background,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text p
        style={{color: theme.font}}
      >
        {R['Looking into sample:']}
      </Text>
      <Text p
        style={{color: theme.font}}
      >
        {sampleSettings.name}
      </Text>
    </View>
  )
})