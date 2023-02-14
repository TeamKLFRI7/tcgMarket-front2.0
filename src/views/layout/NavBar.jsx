import { NavLink } from "react-router-dom";
import { IcHome } from '../../assets/icons/IcHome';
import { IcMenu } from '../../assets/icons/IcMenu';
import { IcPlus } from '../../assets/icons/IcPlus';
// import { IcArrowLeft } from '../../assets/icons/IcArrowLeft';
import {useEffect, useRef, useState} from "react";
// import { useNavigate } from "react-router-dom";


const NavBar = (props) => {
  //  const navigate = useNavigate();

    const ref = useRef(null);
    useEffect(() => {
        const LocalHeight= ref.current.getBoundingClientRect().height;
        props.setHeight(LocalHeight);
    }, [ref, props.setHeight]);


  return (
    <div ref={ref} style={{...props.style, display: 'flex', justifyContent: 'space-around', fontSize: '30px'}} id={'navBar'}>
        <NavLink to={'/ajouter-une-annonce'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcPlus /></NavLink>
        {/* <button onClick={() => navigate(-1)} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcArrowLeft /></button> */}
        <NavLink to={'/'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcHome /></NavLink>
        <NavLink to={'/menu'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcMenu /></NavLink>
    </div>
  )
}

export default NavBar