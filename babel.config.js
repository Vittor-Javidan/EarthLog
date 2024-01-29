module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
    plugins: [
      'expo-router/babel', // NOTE: `expo-router/babel` is a temporary extension to `babel-preset-expo`.
      ['module-resolver', {
        root: '.',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {

          '@VersionManager':       './src/VersionManager.ts',
          '@SubscriptionManager':  './src/SubscriptionManager.ts',
          '@NetworkManager':       './src/NetworkManager.ts',
          '@DevTools':             './src/DevTools.ts',

          // LTS VERSION 2
          '@V2/FileExportModules': './src/V2/FileExportModules',
          '@V2/Themes':            './src/V2/Themes',
          '@V2/Types':             './src/V2/Types',
          '@V2/Globals':           './src/V2/Globals',
          '@V2/Translations':      './src/V2/Translations',
          '@V2/Services':          './src/V2/Services',
          '@V2/Hooks':             './src/V2/Hooks',
          '@V2/Screens':           './src/V2/Screens',
          '@V2/Icon':              './src/V2/Components/Icon',
          '@V2/Text':              './src/V2/Components/Text',
          '@V2/Button':            './src/V2/Components/Button',
          '@V2/Input':             './src/V2/Components/Input',
          '@V2/Animation':         './src/V2/Components/Animation',
          '@V2/Layout':            './src/V2/Components/Layout',
          '@V2/Alert':             './src/V2/Components/Alert',
          '@V2/Camera':            './src/V2/Components/Camera',
          '@V2/Widget':            './src/V2/Components/Widget',
          '@V2/WidgetInput':       './src/V2/Components/WidgetInput',

          // LTS VERSION 1
          '@V1/FileExportModules': './src/V1/FileExportModules',
          '@V1/Themes':            './src/V1/Themes',
          '@V1/Types':             './src/V1/Types',
          '@V1/Globals':           './src/V1/Globals',
          '@V1/Translations':      './src/V1/Translations',
          '@V1/Services':          './src/V1/Services',
          '@V1/Hooks':             './src/V1/Hooks',
          '@V1/Screens':           './src/V1/Screens',
          '@V1/Icon':              './src/V1/Components/Icon',
          '@V1/Text':              './src/V1/Components/Text',
          '@V1/Button':            './src/V1/Components/Button',
          '@V1/Input':             './src/V1/Components/Input',
          '@V1/Animation':         './src/V1/Components/Animation',
          '@V1/Layout':            './src/V1/Components/Layout',
          '@V1/Alert':             './src/V1/Components/Alert',
          '@V1/Camera':            './src/V1/Components/Camera',
          '@V1/Widget':            './src/V1/Components/Widget',
          '@V1/WidgetInput':       './src/V1/Components/WidgetInput',
        },
      }],
      'react-native-reanimated/plugin', // Must be declare as last according to docs
    ],
  };
};
