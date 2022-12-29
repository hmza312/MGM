import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Feedback from "../views/FeedBack.js";
import Home from "../views/Home.js";
import TransferTables from "../views/TransferHistory.js";
import TransferMoney from "../views/TransferMoney.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const About = lazy(() => import("../views/Login.js"));

const Tables = lazy(() => import("../views/ui/Tables"));

/*****Routes******/

const ThemeRoutesUser = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Home /> },
      { path: "/transferMoney", exact: true, element: <TransferMoney /> },
      { path: "/transferHistory", exact: true, element: <TransferTables /> },
      { path: "/feedback", exact: true, element: <Feedback /> },
      // { path: "/register", exact: true, element: <Register /> },
    ],
  },
];

export default ThemeRoutesUser;
