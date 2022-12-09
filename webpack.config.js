var path = require('path')
var webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const demo = 'activity'

module.exports = {
  entry: {
    devtools: './src/devtools.js',
    backend: './src/backend.js',
    hook: './src/hook.js',
    target: './src/demo/' + demo + '/target.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: `postcss-loader`,
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
              ]
            },
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: `postcss-loader`,
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
              ]
            },
          },
          'stylus-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                path.resolve(__dirname, 'devtools/packages/app-frontend/src/style/imports.styl')
              ]
            }
          }
        ]
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     // 'sass-loader'
      //   ],
      // },
      // {
      //   test: /\.sass$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     'sass-loader?indentedSyntax'
      //   ],
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            // 'scss': [
            //   'vue-style-loader',
            //   'css-loader',
            //   'sass-loader'
            // ],
            // 'sass': [
            //   'vue-style-loader',
            //   'css-loader',
            //   'sass-loader?indentedSyntax'
            // ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=0'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@src': path.resolve(__dirname, 'src'),
      '@dist': path.resolve(__dirname, 'dist'),
      '@front-new': path.resolve(__dirname, 'src/frontend'),
      '@front': path.resolve(__dirname, 'devtools/packages/app-frontend/src'),
      '@back': path.resolve(__dirname, 'devtools/packages/app-backend/src'),
      '@utils': path.resolve(__dirname, 'devtools/packages/shared-utils/src'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new VueLoaderPlugin(),
    ...(process.env.VUE_DEVTOOL_TEST ? [] : [new FriendlyErrorsPlugin()]),
  ],
  devServer: {
    // host: 'http://sv.baidu.com',
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  stats: {
    colors: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
