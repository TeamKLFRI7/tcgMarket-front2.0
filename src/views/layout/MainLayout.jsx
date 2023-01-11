import {Outlet} from "react-router-dom";
import home from "../../assets/img/home.png";
import NavBar from "./NavBar";

const MainLayout = () => {

  return (
    <div style={styles.container}>
        <input style={styles.searchBar} placeholder="SearchBar" id={'searchBar'}/>
        <div style={styles.contentContainer}>
            <div style={styles.main}>
                <Outlet/>
            </div>
            <NavBar style={styles.navBar} />
        </div>
    </div>
  )
}

const styles = {
    container: {
        backgroundColor: '#eee',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'strech',
        maxHeight: '100vh'
    },
    searchBar: {
        backgroundColor: '#fff',
        padding: '20px',
        fontSize: '18px',
        borderRadius: '62px',
        border: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        margin: '.5rem 0 .5rem',
    },
    contentContainer: {
        backgroundColor: 'rgb(100, 106, 234)',
        borderRadius: '30px',
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    },
    main: {
        backgroundColor: '#fff',
        padding: '20px',
        fontSize: '18px',
        borderRadius: '30px',
        border: 'none',
        flexGrow: '1',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        marginBottom: '5px',
        maxHeight: 'calc(100vh - searchBar.offsetHeight - navBar.offsetHeight) !important',
    },
    mainHome: {
        backgroundImage: `url(${home}), radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(99,106,242,1) 53%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'fill',
        backgroundPosition: '0% 100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: 'none',
        borderRadius: '30px',
        marginBottom: '5px',
        padding: '20px',
        fontSize: '18px',
        flexGrow: '1',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
    },
    navBar: {
        color: 'white',
        padding: '10px',
        fontSize: '18px',
        border: 'none',
        borderRadius: '30px',
        marginBottom: '5px',
    },
}

export default MainLayout