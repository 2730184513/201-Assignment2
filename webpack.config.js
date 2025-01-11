const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
        publicPath: '/',
        clean: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
            {
                test: /\.(mp3|wav|ogg)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'data',
                    to: 'data',
                    globOptions: {
                        ignore: ['**/.DS_Store']
                    }
                }
            ]
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname),
            publicPath: '/'
        },
        hot: true,
        historyApiFallback: true,
        open: true,
        port: 3002,
        host: 'localhost'
    },
    performance: {
        hints: false
    }
};
