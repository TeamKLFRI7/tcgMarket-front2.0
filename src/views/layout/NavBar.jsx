import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import { IcHome } from "../../assets/icons/IcHome";
import { IcMenu as Hamburger } from "../../assets/icons/IcMenu";
import { IcPlus } from "../../assets/icons/IcPlus";
import { IcArrowLeft } from "../../assets/icons/IcArrowLeft";
import { IcLogin } from "../../assets/icons/IcLogin";
import { IcXMark } from "../../assets/icons/IcXMark";
import { IcUser } from "../../assets/icons/IcUser";
import { IcMesAnnonces } from "../../assets/icons/IcMesAnnonces";
import { IcSold } from "../../assets/icons/IcSold";
import { IcCatalogue } from "../../assets/icons/IcCatalogue";
import TcgLogo from "../../assets/img/logo-tcgMarket.png";
import "./NavBar.css";
import { IcLogout } from "../../assets/icons/IcLogout";

const NavBar = forwardRef((props, ref) => {
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
    <nav className={"navbar"} ref={ref}>
      <div className="navbar-container">
        {location.pathname === "/jeux/1" ? (
          <NavLink
            to={"/vendre-mes-cartes"}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <IcPlus />
          </NavLink>
        ) : (
          <button className={"navbar-button"} onClick={() => navigate(-1)}>
            <IcArrowLeft />
          </button>
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
        <div className={`navElements  ${showNavbar && "active"}`}>
          <div className={"navElements-header"}>
            <button
              className={"navElements-headerButton"}
              onClick={handleShowNavbar}
            >
              <IcXMark />
            </button>
            <img
              className={"navElements-headerLogo"}
              src={TcgLogo}
              alt={TcgLogo}
            />
          </div>
          <ul className={"navElements-ul"}>
            {token && (
              <>
                <li
                  className={"navElements-li navElements-li_MarginTop"}
                  onClick={handleShowNavbar}
                >
                  <NavLink to="#">
                    <span className={"navElements-linkText"}>
                      Mes vente en cours
                      <IcMesAnnonces />
                    </span>
                  </NavLink>
                </li>
                <li className={"navElements-li"} onClick={handleShowNavbar}>
                  <NavLink to="/vendre-mes-cartes">
                    <span className={"navElements-linkText"}>
                      Vendre mes cartes
                      <IcSold />
                    </span>
                  </NavLink>
                </li>
                <li className={"navElements-li"} onClick={handleShowNavbar}>
                  <NavLink to="/profil">
                    <span className={"navElements-linkText"}>
                      Mon profile
                      <IcUser />
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            <li className={"navElements-li"} onClick={handleShowNavbar}>
              <NavLink to={"#"}>
                <span className={"navElements-linkText"}>
                  Cartes en ventes <IcCatalogue />
                </span>
              </NavLink>
            </li>
            {token ? (
              <li className={"navElements-li"} onClick={handleShowNavbar}>
                <NavLink to={"#"}>
                  <span className={"navElements-linkText"}>
                    Se déconnecter <IcLogout />
                  </span>
                </NavLink>
              </li>
            ) : (
              <li className={"navElements-li"} onClick={handleShowNavbar}>
                <NavLink to={"/login"}>
                  <span className={"navElements-linkText"}>
                    Inscription / Connexion <IcLogin />
                  </span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default NavBar;
