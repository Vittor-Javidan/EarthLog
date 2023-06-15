import React from 'react';
import {Text} from 'react-native';
import NewLayout from '../../Components/NewLayout';

export default function MainScreen(): JSX.Element {
  return (
    <NewLayout
      title="Earth Log"
      drawerChildren={<></>}
    >
      <>
        <Text>Content</Text>
      </>
    </NewLayout>
  );
}
