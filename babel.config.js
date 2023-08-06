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
          '@Types': './src/Types',
          '@Components': './src/Components',
          '@Hooks': './src/Hooks',
          '@Services': './src/Services',
          '@Globals': './src/Globals',
          '@Translations': './src/Translations',
          '@Layout': './src/Components/Layout',
          '@Widget': './src/Components/Widget',
          '@WidgetComponents': './src/Components/Widget/Components',
        },
      }],
    ],
  };
};
