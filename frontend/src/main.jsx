import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { MantineProvider } from "@mantine/core";
import { Theme } from "./ThemeAndStyle";
import { DrawerComponent } from "./components/DrawerComponent";
import { Provider } from "react-redux";
import { store } from "./storage/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MantineProvider>
      <DrawerComponent />
      <style>{Theme}</style>
      <StrictMode>
        <App />
      </StrictMode>
    </MantineProvider>
  </Provider>
);
