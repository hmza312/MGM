import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import UseAuthentication from "../hooks/UseAuthenticationHook";
import Sidebar from "./Sidebar";

const FullLayout = ({}) => {
  const { authenticated, logout } = UseAuthentication();
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar logout={logout} />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          {/* <Header /> */}
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
