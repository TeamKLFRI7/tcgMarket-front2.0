import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import { IcHome } from "../../assets/icons/IcHome";
import { IcMenu as Hamburger } from "../../assets/icons/IcMenu";
import { IcPlus } from "../../assets/icons/IcPlus";
import { IcArrowLeft } from "../../assets/icons/IcArrowLeft";
import { IcLogin } from "../../assets/icons/IcLogin";
import { IcXMark } from "../../assets/icons/IcXMark";
import TcgLogo from "../../assets/img/logo-tcgMarket.png";
import "./Menu.css";

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
          <div className={"navElements-header"}>
            <button
              className={"navElements-header-button"}
              onClick={handleShowNavbar}
            >
              <IcXMark color={styles.color} />
            </button>
            <img src={TcgLogo} alt={TcgLogo} />
          </div>
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
                Inscription / Connexion <IcLogin color={styles.color} />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});

const styles = {
  color: {
    color: "rgb(100, 106, 234)",
  },
};

export default NavBarTest;
