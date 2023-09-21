
// import React, { useState, useEffect, useMemo, ReactNode } from 'react';
// import Animated, { withDelay, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

// import { Layout } from '@Layout/index';
// import { API } from './__API__';
// import { LC } from './__LC__';
// import { TC } from './__TC__';
// import { Dimensions } from 'react-native';

// export default function ThemeScreen(): JSX.Element {

//   const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

//   useEffect(() => { setState('Loaded'); }, []);
//   useEffect(() => {
//     return () => { API.ExampleFigure.discart(); };
//   }, []);

//   return (
//     <Layout.Screen
//       screenButtons={<TC.ScreenButtons />}
//     >
//       {state === 'Loading' ? (
//         <Layout.Loading />
//       ) : (
//         <Animation>
//           <Layout.ScrollView
//             contenContainerStyle={{
//               paddingTop: 55,
//             }}
//           >
//             <LC.AllInputs />
//           </Layout.ScrollView>
//         </Animation>
//       )}
//     </Layout.Screen>
//   );
// }

// export function ThemePreviewScreen() {

//   const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

//   useEffect(() => { setState('Loaded'); }, []);

//   return (
//     <Layout.Screen
//       screenButtons={<></>}
//       style={{
//         paddingTop: 55,
//       }}
//     >
//       {state === 'Loading' ? (
//         <Layout.Loading />
//       ) : (
//         <LC.ExampleFigure />
//       )}
//     </Layout.Screen>
//   );
// }

// function Animation(props: { children: ReactNode}) {

//   const { width } = useMemo(() => Dimensions.get('window'), []);
//   const leftOffset = useSharedValue(0);

//   useEffect(() => {
//     const animationFrameId = requestAnimationFrame(() => {
//       leftOffset.value = withDelay(300, withTiming(width, {
//         duration: 200,
//       }));
//     });
//     return () => { cancelAnimationFrame(animationFrameId); };
//   }, []);

//   return (
//     <Animated.View
//       style={[
//         { left: -width },
//         useAnimatedStyle(() => ({
//           transform: [{ translateX: leftOffset.value }],
//         })),
//       ]}
//     >
//       {props.children}
//     </Animated.View>
//   );
// }
