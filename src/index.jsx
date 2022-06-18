// Bring React in to build a component.
import React from "react";
// Import from react-dom the ability to create a root render
import { createRoot } from "react-dom/client";
import App from './app.jsx';
const root = createRoot(document.getElementById("root"));

root.render(<App />);
