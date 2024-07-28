import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Container from "./components/Container/Container.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>
      <Container>
        <App />
      </Container>
    </Provider>
  </ThemeProvider>
);
