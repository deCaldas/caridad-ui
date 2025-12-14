import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentFiles = glob.sync('./src/components/**/*/.js')

const entries = {
  index: './src/index.js',
  tokens: './src/styles/tokens.css',
  globals: './src/styles/globals.css',
}

componentFiles.forEach(file => {
  const name = path.basename(file, '.js');
  const folder = path.basename(path.dirname(file));
  entries[`components/${folder}/${name}`] = file;
});

export default {
  entry: entries,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    module: true,
    library: {
      type: "module"
    },
    clean: true
  },
  experiments: {
    outputModule: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext]'
        }
      }
    ]
  }
};
