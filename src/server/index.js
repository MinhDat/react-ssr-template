// import express from "express";
import express from "express";
import webpack from "webpack";
import webpackConfig from "../../webpack/webpack.config";
import Loadable from "react-loadable";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../containers/App";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

// console.log("webpackConfig", webpackConfig);

const compiler = webpack(webpackConfig);
app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: "/"
  })
);

app.get("*", (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <head>
        <title>Universal React</title>
        <link rel="stylesheet" href="/css/main.css">
      </head>
      <body>
        <div id="root">${renderToString(<App />)}</div>
      </body>
    </html>
  `);
});
Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening ${PORT}`);
  });
});
