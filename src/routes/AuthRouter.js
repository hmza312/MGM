import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ExchangeMoney from "../views/ExchangeMoney.js";
import Feedback from "../views/FeedBack.js";
import Home from "../views/Home.js";
import Register from "../views/Register.js";
import TransferMoney from "../views/TransferMoney.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const About = lazy(() => import("../views/Login.js"));

const Tables = lazy(() => import("../views/ui/Tables"));

/*****Routes******/

const AuthRoutes = [
  {
    path: "/",

    children: [
      { path: "/", element: <Navigate to="/login" /> },

      { path: "/login", exact: true, element: <About /> },

      { path: "/register", exact: true, element: <Register /> },
    ],
  },
];

export default AuthRoutes;
