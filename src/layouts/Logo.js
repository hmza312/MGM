import { LogoDark } from "../assets/images/logos/logo.png";
import logo from "../assets/images/logos/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="" />
    </Link>
  );
};

export default Logo;
