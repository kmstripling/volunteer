import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from "./app";

const container = document.getElementById("app");
ReactDOMClient.hydrateRoot(
    container,
    <App />
  
  );