const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js', // Путь к вашему JavaScript-файлу
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname), // Путь для сохранения собранного файла
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Расширение файлов, подлежащих транспиляции
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    mode: "development"
};