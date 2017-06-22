const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src/StateLearner.ts"),
  output: {
    filename: "StateLearner.js",
    output: path.join(_dirname, "built")
  },
  module: {
    rules: {
      loaders: [
        {
          test: /\.ts$/,
          use: [
            { loader: "babel-loader" }
            { loader: "ts-loader" }
          ]
        }
      ]  
    }
    
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
  }
}