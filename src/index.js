import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from "./app";


ReactDOMClient.hydrateRoot(

    document.getElementById("app"),
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
    

  );