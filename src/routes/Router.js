import { lazy } from "react";
import { Navigate } from "react-router-dom";
import UseAuthentication from "../hooks/UseAuthenticationHook.js";
import ExchangeMoney from "../views/ExchangeMoney.js";
import Feedback from "../views/FeedBack.js";
import Home from "../views/Home.js";
import Register from "../views/Register.js";
import TransferMoney from "../views/TransferMoney.js";
import WithdrawHistory from "../views/WithdrawHistory.js";
import WithdrawMoney from "../views/WithdrawMoney.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const About = lazy(() => import("../views/Login.js"));

const Tables = lazy(() => import("../views/ui/Tables"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Home /> },
      {
        path: "/withdraw",
        exact: true,
        element: <WithdrawMoney />,
      },
      // { path: "/login", exact: true, element: <About /> },
      { path: "/exchangeMoney", exact: true, element: <ExchangeMoney /> },
      { path: "/exchangeHistory", exact: true, element: <Tables /> },
      { path: "/withdrawHistory", exact: true, element: <WithdrawHistory /> },
      // { path: "/buttons", exact: true, element: <Buttons /> },
      // { path: "/cards", exact: true, element: <Cards /> },
      // { path: "/grid", exact: true, element: <Grid /> },
      { path: "/feedback", exact: true, element: <Feedback /> },
      // { path: "/register", exact: true, element: <Register /> },
    ],
  },
];

export default ThemeRoutes;
