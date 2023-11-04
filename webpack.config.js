import path from 'path';

export default {
  entry: './src/client/main.ts', // This should be the entry point of your app
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js', // This is the output file
    path: path.resolve('public', 'dist'), // Output directory, adjusted based on your file structure
  },
  mode: 'development', // Use 'production' for production builds
};
