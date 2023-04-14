import { forwardRef } from "react";
import SearchBar from "../../components/SearchBar";
import TcgLogo from "../../assets/img/logo-tcgMarket.png";
import "./layout.css";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";

const Header = forwardRef((props, ref) => {
  return (
    <div className={"header"} ref={ref}>
      <NavLink to={"/"} className={"header-imgContainer"}>
        <img src={TcgLogo} alt={"TcgLogo"} className={"header-img"} />
      </NavLink>
      <div className={"header-nav"}>
        <NavBar />
        <SearchBar setSearchResults={props.setSearchResults} />
      </div>
    </div>
  );
});

export default Header;
