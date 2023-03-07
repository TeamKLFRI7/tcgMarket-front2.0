import home from "../../assets/img/home.png";
import "./layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ModalForm from "../../components/ModalForm";
import SearchBar from "../../components/SearchBar";
//import NavBarOldVersion from "./NavBarOldVersion";
import NavBar from "./NavBar";

const MainLayout = (props) => {
  const location = useLocation();
  const viewportHeight = props.height;
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const [navBarHeight, setNavBarHeight] = useState(0);
  const searchBarRef = useRef(null);
  const navBarRef = useRef(null);
  const mainRef = useRef(null);

  const hiddenSearchLocation = ["/profil", "/vendre-mes-cartes"];
  const isSearchHidden = hiddenSearchLocation.includes(location.pathname);

  useEffect(() => {
    setNavBarHeight(navBarRef.current.clientHeight);

    if (!isSearchHidden) {
      setSearchBarHeight(searchBarRef.current.clientHeight);
      mainRef.current.style.height = `calc(${viewportHeight}px - ${searchBarHeight}px - ${navBarHeight}px - 2rem)`;
      console.log(searchBarHeight);
    } else {
      mainRef.current.style.height = `calc(${viewportHeight}px - ${searchBarHeight}px - ${navBarHeight}px - 1rem)`;
    }
  }, [searchBarHeight, navBarHeight, isSearchHidden, viewportHeight]);

  return (
    <div style={styles.container}>
      {props.modalOpen && <ModalForm setModalOpen={props.setModalOpen} />}
      {isSearchHidden ? null : (
        <SearchBar
          ref={searchBarRef}
          setSearchResults={props.setSearchResults}
        />
      )}
      <div style={styles.contentContainer}>
        <div ref={mainRef} style={styles.main}>
          <Outlet />
        </div>
        <NavBar ref={navBarRef} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#eee",
    padding: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "strech",
    height: "100vh",
  },
  contentContainer: {
    backgroundColor: "rgb(100, 106, 234)",
    borderRadius: "30px",
    display: "flex",
    flexGrow: "1",
    flexDirection: "column",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
  main: {
    backgroundColor: "#fff",
    padding: "20px",
    fontSize: "18px",
    borderRadius: "30px",
    border: "none",
    flexGrow: "1",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    marginBottom: "0.25rem",
    height: "",
    overflow: "scroll",
  },
  mainHome: {
    backgroundImage: `url(${home}), radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(99,106,242,1) 53%)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "fill",
    backgroundPosition: "0% 100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "none",
    borderRadius: "30px",
    marginBottom: "5px",
    padding: "20px",
    fontSize: "18px",
    flexGrow: "1",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
};

export default MainLayout;
