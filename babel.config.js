module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
    plugins: [
      // NOTE: `expo-router/babel` is a temporary extension to `babel-preset-expo`.
      require.resolve('expo-router/babel'),
      'react-native-reanimated/plugin',
      '@babel/plugin-proposal-export-namespace-from',
      ['module-resolver', {
        root: '.',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {

          '@VersionManager':       './src/VersionManager.ts',

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
    ],
  };
};
