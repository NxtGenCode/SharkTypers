import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Login from './Login/Login.jsx';
import SharkTyperBox from './SharkTyperBox/SharkTyperBox.jsx';
import ErrorPage from './Error/ErrorPage.jsx';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/play",
    element: <SharkTyperBox/>
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
