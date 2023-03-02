import { NavLink } from "react-router-dom";
import { IcHome } from "../../assets/icons/IcHome";
import { IcMenu } from "../../assets/icons/IcMenu";
import { IcPlus } from "../../assets/icons/IcPlus";
import { IcArrowLeft } from "../../assets/icons/IcArrowLeft";
import { useNavigate, useLocation } from "react-router-dom";
import { forwardRef, useRef } from "react";

const NavBar = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      style={{
        ...props.style,
        display: "flex",
        justifyContent: "space-around",
        fontSize: "2rem",
      }}
      id={"navBar"}
      ref={ref}
    >
      {location.pathname === "/jeux/1" ? (
        <NavLink
          to={"/ajouter-une-annonce"}
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
      <NavLink
        onClick={() => props.setMenuOpen(true)}
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        <IcMenu />
      </NavLink>
    </div>
  );
});

export default NavBar;
