import React from 'react';
import { createRoot } from 'react-dom/client';
// import { createHashRouter, RouterProvider } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import './custom.scss';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// const router = createHashRouter([
//   {
//     path: "/*",
//     element: <App />,
//   }
// ]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
