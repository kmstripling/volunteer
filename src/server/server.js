import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../app";

const server = express();
server.use(express.static("dist"));

server.get("/", (req, res) => {

  const initialMarkup = ReactDOMServer.renderToString(
      <App />

  );

  res.send(`
    <html>
      <head>
        <title>Event Volunteer App</title>
      </head>
      <body>
        <div id="app">${initialMarkup}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `)
});

server.listen(4242, () => console.log("Server is running..."));