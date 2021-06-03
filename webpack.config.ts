import * as path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import webpack from "webpack"

const isEnvProduction = process.env.NODE_ENV === "production"
const isEnvDevelopment = process.env.NODE_ENV === "development"
const isEnvProductionProfile =
  isEnvProduction && process.argv.includes("--profile")

const backendConfig: webpack.Configuration = {
  entry: "./src/backend/index.ts",
  output: {
    path: path.resolve(__dirname, "build", "backend"),
    filename: "server.js",
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
}

const frontendConfig: webpack.Configuration | webpack.WebpackOptionsNormalized =
  {
    entry: "./src/frontend/index.tsx",
    output: {
      path: path.resolve(__dirname, "build", "frontend"),
      filename: isEnvProduction
        ? "static/js/[name].[contenthash:8].js"
        : "static/js/[name].chunk.js",
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : "static/js/[name].chunk.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 2020,
            },
            compress: {
              ecma: 5,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: {
        name: (entrypoint: { name?: string }) => `runtime-${entrypoint.name}`,
      },
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: "./public/index.html",
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
    ],
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".jsx"],
    },
    devServer: isEnvDevelopment
      ? {
          contentBase: path.join(__dirname, "build", "frontend"),
          compress: true,
          port: 9000,
          open: true,
          writeToDisk: true,
        }
      : undefined,
  }

export default [backendConfig, frontendConfig]
