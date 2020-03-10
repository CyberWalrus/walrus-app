/* eslint-disable import/no-extraneous-dependencies */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpackDevServer from 'webpack-dev-server';

const isDevelopment = true;

const root = (args: string): string => path.join(...[__dirname].concat('./', args));
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
      },
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

const publicUrl = '';
const env = getClientEnvironment(publicUrl);

const webpackConfig = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  entry: {
    bundle: [root('src/index.tsx')],
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'app.[hash].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3040,
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.scss|css$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@components': root('src/components'),
      '@constants': root('src/constants'),
      '@containers': root('src/containers'),
      '@hooks': root('src/hooks'),
      '@pages': root('src/pages'),
      '@stores': root('src/stores'),
      '@custom-types': root('src/custom-types'),
      '@utils': root('src/utils'),
      '@src': root('src'),
      '@build': root('build'),
    },
    extensions: ['.ts', '.tsx', '.js', 'json'],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ hash: false, template: './public/index.html' }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
    new webpack.DefinePlugin(env.stringified),
    new BundleAnalyzerPlugin(),
  ],
};

export default webpackConfig;
