
import React from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import Layout from '../../Components/Layout';
import DrawerButton from '../../Components/DrawerButton';
import LogService from '../../Services/LogService';

export default function ConfigScreen(): JSX.Element {
  LogService.useLog('CONFIG SCREEN: renderizado');

  const navController = useRouter();

  return (
    <Layout
      title="Settings"
      drawerChildren={<>
        <DrawerButton
          title="MainScreen"
          onPress={() => navController.push('/MainScreen')}
        />
      </>}
    >
      <>
        <Text>Content</Text>
      </>
    </Layout>
  );
}
