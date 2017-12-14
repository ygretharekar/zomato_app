var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['react-hot-loader/webpack', 'babel-loader']
            }
        ]
    },
    stats: {
        colors: true
    },
    devServer : {
        inline: true,
        contentBase: './dist',
        port: 8100,
        historyApiFallback: true
    }
};