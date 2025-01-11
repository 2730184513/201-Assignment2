const path = require('path');

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
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.(mp3|wav|ogg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'audio/[name][ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        static: [
            {
                directory: path.join(__dirname, 'public'),
                publicPath: '/'
            },
            {
                directory: path.join(__dirname, 'src/data'),
                publicPath: '/data'
            }
        ],
        hot: true,
        historyApiFallback: true,
        open: true,
        port: 3001,
        host: 'localhost'
    },
    performance: {
        hints: false
    }
};
