import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigationAdmin = [
  {
    title: "Home",
    href: "/home",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Withdraw Money",
    href: "/withdraw",
    icon: "bi bi-currency-exchange",
  },
  {
    title: "Exchange Money",
    href: "/exchangeMoney",
    icon: "bi bi-currency-exchange",
  },
  {
    title: "Exchange History",
    href: "/exchangeHistory",
    icon: "bi bi-clock-history",
  },

  {
    title: "Withdraw History",
    href: "/withdrawHistory",
    icon: "bi bi-clock-history",
  },
  // {
  //   title: "Buttons",
  //   href: "/buttons",
  //   icon: "bi bi-hdd-stack",
  // },
  // {
  //   title: "Cards",
  //   href: "/cards",
  //   icon: "bi bi-card-text",
  // },
  // {
  //   title: "Grid",
  //   href: "/grid",
  //   icon: "bi bi-columns",
  // },
  // {
  //   title: "Table",
  //   href: "/table",
  //   icon: "bi bi-layout-split",
  // },
  {
    title: "Feedback",
    href: "/feedback",
    icon: "bi bi-person-lines-fill",
  },
  // {
  //   title: "Register",
  //   href: "/register",
  //   icon: "bi bi-person-circle",
  // },
  // {
  //   title: "Login",
  //   href: "/login",
  //   icon: "bi bi-person-check-fill",
  // },
];
const navigationUser = [
  {
    title: "Home",
    href: "/home",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Transfer Money",
    href: "/transferMoney",
    icon: "bi bi-currency-dollar",
  },

  {
    title: "Transfer History",
    href: "/transferHistory",
    icon: "bi bi-clock-history",
  },

  // {
  //   title: "Buttons",
  //   href: "/buttons",
  //   icon: "bi bi-hdd-stack",
  // },
  // {
  //   title: "Cards",
  //   href: "/cards",
  //   icon: "bi bi-card-text",
  // },
  // {
  //   title: "Grid",
  //   href: "/grid",
  //   icon: "bi bi-columns",
  // },
  // {
  //   title: "Table",
  //   href: "/table",
  //   icon: "bi bi-layout-split",
  // },
  {
    title: "Feedback",
    href: "/feedback",
    icon: "bi bi-person-lines-fill",
  },
  // {
  //   title: "Register",
  //   href: "/register",
  //   icon: "bi bi-person-circle",
  // },
  // {
  //   title: "Login",
  //   href: "/login",
  //   icon: "bi bi-person-check-fill",
  // },
];
const Sidebar = ({ logout }) => {
  const isAdmins = JSON.parse(localStorage.getItem("user"));
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {isAdmins.isAdmin ? (
            <>
              {navigationAdmin.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname === navi.href
                        ? "text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))}
            </>
          ) : (
            <>
              {navigationUser.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname === navi.href
                        ? "text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))}
            </>
          )}
          <Button onClick={logout}>Logout</Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
