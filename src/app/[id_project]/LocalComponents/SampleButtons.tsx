import React, { ReactNode, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MotiView } from 'moti';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import CacheService from '@Services/CacheService';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  return (
    <Layout.ScrollView>
      <Animation>
        {CacheService.allSamples.map(sampleSettings => (
          <Layout.Button.TextWithIcon
            key={sampleSettings.id_sample}
            title={sampleSettings.name}
            iconSide="Right"
            iconName="clipboard"
            onPress={() => navigate('SAMPLE SCREEN', id_project, sampleSettings.id_sample)}
          />
        ))}
      </Animation>
    </Layout.ScrollView>
  );
}

function Animation(props: { children: ReactNode}) {

  const { width } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      style={{
        paddingTop: 1,
        gap: 1,
      }}
      from={{ left: -width }}
      transition={{
        type: 'timing',
        duration: 500,
      }}
      animate={{
        left: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}
