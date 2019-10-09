const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    devServer: {
        historyApiFallback: true
    },
    mode: "production",
    context: __dirname,
    entry: "./src/index.tsx",
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "build.js",
        publicPath: "/"
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
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "index.html"
        })
    ]
};