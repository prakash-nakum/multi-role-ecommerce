"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";

const Redux = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Redux;
