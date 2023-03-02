import { NavLink } from "react-router-dom";
import { IcHome } from "../../assets/icons/IcHome";
import { IcMenu as Hamburger } from "../../assets/icons/IcMenu";
import { IcPlus } from "../../assets/icons/IcPlus";
import { IcArrowLeft } from "../../assets/icons/IcArrowLeft";
import { useNavigate, useLocation } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import "./Menu.css";
import { IcLogin } from "../../assets/icons/IcLogin";

const NavBarTest = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [showNavbar, setShowNavbar] = useState(false);

  const getToken = async () => {
    const localToken = await localStorage.getItem("token");
    if (localToken) setToken(localToken);
  };
  useEffect(() => {
    getToken();
  }, []);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <nav className="navbar" ref={ref}>
      <div className="container">
        {location.pathname === "/jeux/1" ? (
          <NavLink
            to={"/vendre-mes-cartes"}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <IcPlus />
          </NavLink>
        ) : (
          <NavLink
            onClick={() => navigate(-1)}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <IcArrowLeft />
          </NavLink>
        )}
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <IcHome />
        </NavLink>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to={"/login"}>
                INSCRIPTION / CONNEXION <IcLogin />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default NavBarTest;
