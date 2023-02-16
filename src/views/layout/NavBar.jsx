import { NavLink } from "react-router-dom";
import { IcHome } from '../../assets/icons/IcHome';
import { IcMenu } from '../../assets/icons/IcMenu';
import { IcPlus } from '../../assets/icons/IcPlus';
import { IcArrowLeft } from '../../assets/icons/IcArrowLeft';
import {useEffect, useRef, useState} from "react";
import Menu from "../../components/Menu";
import { useNavigate, useLocation } from "react-router-dom";


const NavBar = (props ) => {
   const navigate = useNavigate();
   const location = useLocation();

    const ref = useRef(null);
    useEffect(() => {
        const LocalHeight= ref.current.getBoundingClientRect().height;
        props.setHeight(LocalHeight);
    }, [ref, props]);

  return (
      <div ref={ref} style={{...props.style, display: 'flex', justifyContent: 'space-around', fontSize: '30px'}} id={'navBar'}>
          { 
            location.pathname === "/jeux/1" ? <NavLink to={'/ajouter-une-annonce'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcPlus /></NavLink> :
            <NavLink onClick={() => navigate(-1)} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcArrowLeft /></NavLink>
          }
          <NavLink to={'/'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcHome /></NavLink>
          <NavLink onClick={() => props.setMenuOpen(true)} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcMenu /></NavLink>
      </div> 
  )
}

export default NavBar