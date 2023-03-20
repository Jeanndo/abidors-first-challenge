import { Fragment } from "react";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
}
