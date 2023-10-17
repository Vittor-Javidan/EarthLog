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
          '@APIServices':       './src/APIServices',
          '@FileExportModules': './src/FileExportModules',
          '@Themes':            './src/Themes',
          '@Types':             './src/Types',
          '@Globals':           './src/Globals',
          '@Translations':      './src/Translations',
          '@Services':          './src/Services',
          '@Hooks':             './src/Hooks',
          '@Screens':           './src/Screens',
          '@Icon':              './src/Components/Icon',
          '@Text':              './src/Components/Text',
          '@Button':            './src/Components/Button',
          '@Input':             './src/Components/Input',
          '@Animation':         './src/Components/Animation',
          '@Layout':            './src/Components/Layout',
          '@Alert':             './src/Components/Alert',
          '@Widget':            './src/Components/Widget',
          '@WidgetInput':       './src/Components/WidgetInput',
        },
      }],
    ],
  };
};
