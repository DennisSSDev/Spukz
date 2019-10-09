const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "production",
    context: __dirname,
    entry: "./src/index.tsx",
    devtool: false,
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "build.js",
        publicPath: "/"
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css?$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
              },
              {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
              },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "index.html"
        }),
        new webpack.ProvidePlugin({
            "React": "react",
            "react-dom": "ReactDOM"
         }),
    ]
};