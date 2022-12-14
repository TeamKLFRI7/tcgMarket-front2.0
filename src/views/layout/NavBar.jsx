import { NavLink } from "react-router-dom"
import { FaDollarSign, FaEllipsisH, FaHome } from 'react-icons/fa'

const NavBar = (props) => {
  return (
    <div style={{...props.style, display: 'flex', justifyContent: 'space-around', fontSize: '30px'}}>
        <NavLink to={'/sell'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><FaDollarSign /></NavLink>
        <NavLink to={'/'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><FaHome /></NavLink>
        <NavLink to={'/menu'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}><FaEllipsisH /></NavLink>
    </div>
  )
}

export default NavBar