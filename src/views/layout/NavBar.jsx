import { NavLink } from "react-router-dom"
import { IcHome } from '../../assets/icons/IcHome'
import { IcMenu } from '../../assets/icons/IcMenu'
import { IcPlus } from '../../assets/icons/IcPlus'

const NavBar = (props) => {
  return (
    <div style={{...props.style, display: 'flex', justifyContent: 'space-around', fontSize: '30px'}} id={'navBar'}>
        <NavLink to={'/ajouter-une-annonce'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcPlus /></NavLink>
        <NavLink to={'/'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcHome /></NavLink>
        <NavLink to={'/menu'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><IcMenu /></NavLink>
    </div>
  )
}

export default NavBar