const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    externals: {
        // 'vue': 'Vue',
        // 'iview':'iview',
        //prod
        'quill':'Quill',
        'vue-router': 'VueRouter',
        'vuex':'Vuex',
        'axios': 'axios'
    },
    entry: {
        main: './src/main',
        vendors: './src/vendors'
    },
    output: {
        path: path.join(__dirname, './dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
         'window.Quill': 'quill'
      })
    ],
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {

                        less: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        }),

                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'autoprefixer-loader'],
                            fallback: 'vue-style-loader'
                        }),

                        scss: 'style-loader!css-loader!sass-loader',
                        sass: 'style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                }
            },
            {
                test: /\.scss$/,
                //loaders: ['style', 'css', 'sass'],
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ],
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: ['autoprefixer-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf|ico)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    }
};