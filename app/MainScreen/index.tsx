import React from 'react';
import {Text} from 'react-native';
import Layout from '../../Components/Layout';
import DrawerButton from '../../Components/DrawerButton';
import { useRouter } from 'expo-router';

export default function MainScreen(): JSX.Element {

  const navController = useRouter();

  return (
    <Layout
      title="Earth Log"
      drawerChildren={<>
        <DrawerButton
          title="Config"
          onPress={() => navController.push('/ConfigScreen')}
        />
      </>}
    >
      <>
        <Text>Content</Text>
      </>
    </Layout>
  );
}
