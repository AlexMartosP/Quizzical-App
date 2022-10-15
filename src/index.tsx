import React from "react";
import * as ReactDOM from "react-dom/client";
// Components
import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
