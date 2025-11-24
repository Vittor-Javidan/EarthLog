import { memo, useMemo } from "react";
import { View } from "react-native";

import {
  ProjectMapScope
} from "@V1/Types";

import { translations } from "@V1/Translations/index";
import { ThemeService } from "@V1/Services_Core/ThemeService";
import { ConfigService } from "@V1/Services/ConfigService";
import { CacheService } from "@V1/Services/CacheService";
import { Text } from "@V1/Text/index";

export const MapLabel_Project = memo((props: {
  scope: ProjectMapScope
}) => {

  const { scope } = props
  const { id_project } = scope;
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.layers.map[config.language], []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache({ id_project }), [id_project]);

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
        {R['Looking into project:']}
      </Text>
      <Text p
        style={{color: theme.font}}
      >
        {projectSettings.name}
      </Text>
    </View>
  );
});