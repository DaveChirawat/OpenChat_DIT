import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './pages/backoffice/SignIn';
import Home from './pages/backoffice/Home';
import Product from './components/Product';
import OpenChat from './components/OpenChat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />
  },
  {
    path: "/home",
    element: <Home />
  }, 
  {
    path: "/product",
    element: <Product />
  },
  {
    path: "/openchat",
    element: <OpenChat />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
