import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ImageProvider } from "./context/ImageContext";
import { SearchProvider } from "./context/SearchContext";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <UserProvider>
        <ImageProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </ImageProvider>
      </UserProvider>
    </BrowserRouter>
  </Provider>
);
