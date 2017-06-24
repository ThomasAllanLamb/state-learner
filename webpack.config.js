const path = require("path");

const config = {
  entry: path.join(__dirname, "src/StateLearner.ts"),
  output: {
    filename: "StateLearner.js",
    path: path.join(__dirname, "built"),
    library: "StateLearner",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          },
          { loader: "ts-loader" }
        ]
      }  
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
}

module.exports = config;