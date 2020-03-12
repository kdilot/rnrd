module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['babel-plugin-styled-components'],
        [
            'module-resolver',
            {
                root: ['.'],
                alias: {
                    '@navigations': './src/navigations', // path
                    '@screens': './src/screens', // path
                    '@components': './src/components', // path
                },
                extensions: [
                    '.ios.ts',
                    '.android.ts',
                    '.ts',
                    '.ios.tsx',
                    '.android.tsx',
                    '.tsx',
                    '.jsx',
                    '.js',
                    '.json',
                ],
            },
        ],
    ],
};
