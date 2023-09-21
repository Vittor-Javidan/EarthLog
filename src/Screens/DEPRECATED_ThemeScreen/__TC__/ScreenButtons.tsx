// import React, { useMemo } from 'react';

// import { navigate } from '@Globals/NavigationControler';
// import ConfigService from '@Services/ConfigService';

// import { Button } from '@Button/index';
// import { Layout } from '@Layout/index';
// import { API } from '../__API__';

// export default function ScreenButtons() {

//   const { theme } = useMemo(() => ConfigService.config, []);

//   function resetTheme() {
//     API.ExampleFigure.reset();
//   }

//   function cancelAndExit() {
//     API.ExampleFigure.discart();
//     navigate('SETTINGS SCOPE');
//   }

//   async function confirmAndSave() {
//     await API.ExampleFigure.save();
//     navigate('SETTINGS SCOPE');
//   }

//   return (
//     <Layout.ScreenButtons
//       buttons={[
//         <Button.RoundedIcon
//           key="1"
//           iconName="close"
//           showPlusSign={false}
//           buttonDiameter={60}
//           onPress={() => cancelAndExit()}
//           theme={{
//             font: theme.onWrong,
//             font_Pressed: theme.onTertiary,
//             background: theme.wrong,
//             background_Pressed: theme.tertiary,
//           }}
//         />,
//         <Button.RoundedIcon
//           key="2"
//           iconName="refresh-sharp"
//           showPlusSign={false}
//           buttonDiameter={60}
//           onPress={() => resetTheme()}
//           theme={{
//             font: theme.onSecondary,
//             font_Pressed: theme.onTertiary,
//             background: theme.secondary,
//             background_Pressed: theme.tertiary,
//           }}
//         />,
//         <Button.RoundedIcon
//           key="3"
//           iconName="save"
//           showPlusSign={false}
//           buttonDiameter={60}
//           onPress={async () => await confirmAndSave()}
//           theme={{
//             font: theme.onConfirm,
//             font_Pressed: theme.onTertiary,
//             background: theme.confirm,
//             background_Pressed: theme.tertiary,
//           }}
//         />,
//       ]}
//     />
//   );
// }
