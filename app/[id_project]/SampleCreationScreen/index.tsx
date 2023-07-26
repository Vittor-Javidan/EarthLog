import React, { useMemo } from 'react';
import { Text } from 'react-native';

import LogService from '@Services/LogService';
import { useLocalSearchParams } from 'expo-router';
import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
import { Layout } from '@Components/Layout';

export default function SampleCreationScreen() {

  LogService.useLog('SAMPLE CREATION SCREEN: rendered');

  // const navController = useRouter();
  const { id_project: PROJECT_ID } = useLocalSearchParams();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  console.log(PROJECT_ID);

  return (
    <Layout.Root
      title="Sample Creation"
      iconName="pencil-sharp"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[]}
    >
      <Layout.ScrollView>
        <Text
          style={{ color: theme.onBackground }}
        >
          {PROJECT_ID}
        </Text>
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title="Add"
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => alert('ainda não implementado')}
        />
      </Layout.View>
    </Layout.Root>
  );
}
