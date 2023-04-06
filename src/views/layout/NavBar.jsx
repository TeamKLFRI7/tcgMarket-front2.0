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
import "./layout.css";
import { IcLogout } from "../../assets/icons/IcLogout";

const NavBar = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [show, setShow] = useState();
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
  const handleDisconnect = () => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
    }
  };

  function toggleShow() {
    setShow(!show);
  }

  console.log(show);

  return (
    <nav className={"navbar"} ref={ref}>
      <div className="navbar-container">
        {location.pathname === "/jeux/1" ? (
          <NavLink to={"/vendre-mes-cartes"} className={"navbar-element_dnone"}>
            <IcPlus />
          </NavLink>
        ) : (
          <button
            className={"navbar-button navbar-element_dnone"}
            onClick={() => navigate(-1)}
          >
            <IcArrowLeft />
          </button>
        )}
        <NavLink to={"/"} className={"navbar-element_dnone"}>
          <IcHome />
        </NavLink>
        <div
          className="menu-icon navbar-element_dnone"
          onClick={handleShowNavbar}
        >
          <Hamburger />
        </div>
        <div className={`navElements  ${showNavbar && "active"}`}>
          <div className={"navElements-header navbar-element_dnone"}>
            <button
              className={"navElements-headerButton"}
              onClick={handleShowNavbar}
            >
              <IcXMark color={"white"} />
            </button>
            <img
              className={"navElements-headerLogo"}
              src={TcgLogo}
              alt={TcgLogo}
            />
          </div>
          <ul className={"navElements-ul"}>
            <li
              className={"navElements-li navElements-li_MarginTop0"}
              onClick={handleShowNavbar}
            >
              <NavLink to={"#"}>
                <span
                  className={"navElements-linkText navElements-linkText_md"}
                >
                  Cartes en ventes
                  <span className={"navbar-element_dnone"}>
                    <IcCatalogue />
                  </span>
                </span>
              </NavLink>
            </li>
            {token ? (
              <>
                <li
                  className={"navElements-li navbar-element_dnone"}
                  onClick={handleShowNavbar}
                >
                  <NavLink to="/vendre-mes-cartes">
                    <span className={"navElements-linkText"}>
                      Vendre mes cartes
                      <span className={"navbar-element_dnone"}>
                        <IcSold />
                      </span>
                    </span>
                  </NavLink>
                </li>
                <li
                  className={"navElements-li navbar-element_dnone"}
                  onClick={handleShowNavbar}
                >
                  <NavLink to="#">
                    <span className={"navElements-linkText"}>
                      Mes ventes en cours
                      <span className={"navbar-element_dnone"}>
                        <IcMesAnnonces />
                      </span>
                    </span>
                  </NavLink>
                </li>
                <li
                  className={"navElements-li navbar-element_dnone"}
                  onClick={handleShowNavbar}
                >
                  <NavLink to="/profil">
                    <span className={"navElements-linkText"}>
                      Mon profil
                      <span className={"navbar-element_dnone"}>
                        <IcUser />
                      </span>
                    </span>
                  </NavLink>
                </li>
                <li
                  className={"navElements-li navbar-element_dnone"}
                  onClick={handleShowNavbar}
                >
                  <NavLink to={"/"} onClick={handleDisconnect}>
                    <span className={"navElements-linkText"}>
                      Se déconnecter
                      <span className={"navbar-element_dnone"}>
                        <IcLogout />
                      </span>
                    </span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li
                  className={"navElements-li navbar-element_dnone"}
                  onClick={handleShowNavbar}
                >
                  <NavLink to={"/login"}>
                    <span className={"navElements-linkText"}>
                      Inscription / Connexion <IcLogin />
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {token ? (
              <li
                className={"navElements-li navElements-dropdown"}
                onClick={toggleShow}
              >
                <span
                  className={"navElements-linkText navElements-linkText_center"}
                >
                  Mon compte
                </span>
                {show && (
                  <div className={"navElements-dropdownMenu"}>
                    <div className={"dropDownMenu-links"}>
                      <NavLink to={"/profil"}>
                        <span className={"dropdownMenu-text"}>Mon profil</span>
                      </NavLink>
                      <NavLink to={"/vendre-mes-cartes"}>
                        <span className={"dropdownMenu-text"}>
                          Vendre mes cartes
                        </span>
                      </NavLink>
                      <NavLink to={"#"}>
                        <span className={"dropdownMenu-text"}>
                          Mes ventes en cours
                        </span>
                      </NavLink>
                      <NavLink to={"/"} onClick={handleDisconnect}>
                        <span
                          className={"dropdownMenu-text dropdownMenu-text_MB"}
                        >
                          Se déconnecter
                        </span>
                      </NavLink>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li className={"navElements-li navElements-li_md"}>
                <NavLink to={"/login"}>
                  <span
                    className={
                      "navElements-linkText navElements-linkText_md navElements-linkText_center"
                    }
                  >
                    Se connecter
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
