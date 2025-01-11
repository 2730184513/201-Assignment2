const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
        clean: true
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
                    filename: 'assets/images/[name][ext]'
                }
            },
            {
                test: /\.(mp3|wav|ogg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/audio/[name][ext]'
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
                    from: 'src/data',
                    to: 'data'
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
        port: process.env.PORT || 3001,
        host: process.env.HOST || 'localhost'
    },
    performance: {
        hints: false
    }
};
