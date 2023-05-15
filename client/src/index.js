import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ImageProvider } from "./context/ImageContext(지울예정)";
// import { SearchProvider } from "./context/SearchContext";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <ImageProvider> */}
      {/* <SearchProvider> */}
      <App />
      {/* </SearchProvider> */}
      {/* </ImageProvider> */}
    </BrowserRouter>
  </Provider>
);
