import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Layout from "../layout/Layout";
import Adoptar from "../pages/Adoptar";
import Donar from "../pages/donar/Donar";
import AboutUs from "../pages/aboutUs/AboutUs";
import Contact from "../pages/contact/Contact";
import EditInfo from "../pages/editInfo/EditInfo";
import Login from "../pages/login/Login";
import PrivateRoute from "./PrivateRoute";
import SignIn from "../pages/signin/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/adoptar",
        element: <Adoptar />,
      },
      {
        path: "/donar",
        element: (
          <PrivateRoute>
            <Donar />
          </PrivateRoute>
        ),
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/contacto",
        element: <Contact />,
      },
      {
        path: "/editInfo/:id",
        element: (
          <PrivateRoute>
            <EditInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);
