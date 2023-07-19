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
          '@Components': './Components',
          '@Services': './Services',
          '@Globals': './Globals',
          '@Translations': './Translations',
          '@Layout': './Components/Layout',
          '@Icon': './Components/Icon',
          '@Inputs': './Components/Inputs',
          '@Widget': './Components/Widget',
          '@WidgetComponents': './Components/Widget/Components',
        },
      }],
    ],
  };
};
