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
          '@Types':             './src/Types',
          '@Hooks':             './src/Hooks',
          '@Services':          './src/Services',
          '@Globals':           './src/Globals',
          '@Translations':      './src/Translations',
          '@Screens':           './src/Screens',
          '@Icon':              './src/Components/Icon',
          '@Alert':             './src/Components/Alert',
          '@Text':              './src/Components/Text',
          '@Button':            './src/Components/Button',
          '@Input':             './src/Components/Input',
          '@WidgetInput':       './src/Components/WidgetInput',
          '@Layout':            './src/Components/Layout',
          '@Widget':            './src/Components/Widget',
        },
      }],
    ],
  };
};
