import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";

import store from "./store.js";

import Home from "components/HomePage/index.js";

import "globals.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Provider store={store}><Home /></Provider>);