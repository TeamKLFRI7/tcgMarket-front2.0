import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom"
import { IcPlus } from '../icons/IcPlus'
import { IcUser } from '../icons/IcUser'
import { IcMesAnnonces } from '../icons/IcMesAnnonces'
import { IcCatalogue } from '../icons/IcCatalogue'
import { IcSold } from '../icons/IcSold'
import { IcLogin } from '../icons/IcLogin'
import { IcXMark } from '../icons/IcXMark'

const NavBar = (props) => {
  let navigate = useNavigate();
  
  return (
    <div style={styles.menuContainer}>
        <button style={styles.quit} onClick={() => navigate(-1)} >
            <IcXMark />
        </button>
        <div style={styles.menuPart1}>
            <NavLink to={'/ajouter-une-annonce'} style={styles.link}><h2 style={styles.title}>AJOUTER UNE ANNONCE </h2><IcPlus /></NavLink>
            <NavLink to={'/profil'} style={styles.link}><h2 style={styles.title}>PROFIL PERSONNEL </h2><IcUser /></NavLink>
            <NavLink to={'/mes-annonces'} style={styles.link}><h2 style={styles.title}>MES ANNONCES </h2><IcMesAnnonces /></NavLink>
            <NavLink to={'/catalogue'} style={styles.link}><h2 style={styles.title}>CATALOGUE DES CARTES </h2><IcCatalogue /></NavLink>
            <NavLink to={'/cartes-en-stock'} style={styles.link}><h2 style={styles.title}>CARTES EN STOCK </h2><IcSold /></NavLink>
        </div>
        <div style={styles.menuPart2}>
          <NavLink to={'/login'} style={styles.link}><h2 style={styles.title}>INSCRIPTION / CONNEXION </h2><IcLogin /></NavLink>
        </div>
    </div>
  )
}
const styles = {
  a: {
    textDecoration: 'unset',
  },
  menuContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#636AF2',
      height: '100vh',
      textDecoration: 'none',
      padding: '0 30px'
  },
  quit: {
    marginTop: '20px',
    marginLeft: '280px',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none'
  },
  menuPart1: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuPart2: {
      display: 'flex',
      flexDirection: 'column',
  },
  title: {
      fontSize: '18px',
      margin: '0',
      marginBottom: '20px',
      textDecoration: 'none',
      color: 'white',
      marginRight: '50px'
  },
  link: {
    display: 'flex',
    maxWidth: '500px',
    justifyContent: 'space-between',
    textDecoration: 'none',
    marginBottom: '20px',
    fontSize: '14px',
  }
}

export default NavBar