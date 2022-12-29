/* eslint-disable react-hooks/rules-of-hooks */
import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";

import UseAuthentication from "./hooks/UseAuthenticationHook";

import { Redirect } from "./utils/helpers";
import AuthRoutes from "./routes/AuthRouter";
import ThemeRoutesUser from "./routes/RouterUser";
let routing;
const App = () => {
  const { authenticated, logout } = UseAuthentication();
  const isAdmins = JSON.parse(localStorage.getItem("user"));
  console.log(authenticated);
  if (authenticated) {
    if (isAdmins.isAdmin) {
      routing = useRoutes(Themeroutes);
    } else {
      routing = useRoutes(ThemeRoutesUser);
    }
  } else {
    routing = useRoutes(AuthRoutes);
  }

  return <div className="dark">{routing}</div>;
};

export default App;
