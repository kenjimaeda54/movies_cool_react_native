module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          '@/components': './src/components',
          '@/routes': './src/routes',
          '@/screens': './src/screens',
          '@/declaration': './src/declaration',
          '@/global': './src/global',
          '@/utils': './src/utils',
          '@/themes': './src/themes',
          '@/mock': './src/mock',
          '@/view_models': './src/view_models',
          '@/services': './src/services',
        },
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
      },
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
}
