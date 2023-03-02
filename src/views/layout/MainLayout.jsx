import { Outlet } from "react-router-dom";
import home from "../../assets/img/home.png";
import NavBar from "./NavBar";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SearchBarBis from "../../components/SearchBarBis";
import ModalForm from "../../components/ModalForm";

const MainLayout = (props) => {
  console.log(props);
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const [navBarHeight, setNavBarHeight] = useState(0);
  const searchBarRef = useRef(null);
  const navBarRef = useRef(null);
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    setSearchBarHeight(searchBarRef.current.clientHeight);
    setNavBarHeight(navBarRef.current.clientHeight);
  }, []);

  useEffect(() => {
    const viewportHeight = window.innerHeight;
    mainRef.current.style.height = `calc(${viewportHeight}px - ${searchBarHeight}px - ${navBarHeight}px - 2rem)`;
  }, [searchBarHeight, navBarHeight]);

  return (
    <div style={styles.container}>
      {props.modalOpen && <ModalForm setModalOpen={props.setModalOpen} />}
      <SearchBarBis
        ref={searchBarRef}
        setSearchResults={props.setSearchResults}
      />
      <div style={styles.contentContainer}>
        <div ref={mainRef} style={styles.main}>
          <Outlet />
        </div>
        <NavBar ref={navBarRef} style={styles.navBar} />
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
    maxHeight: "100vh",
  },
  contentContainer: {
    backgroundColor: "rgb(100, 106, 234)",
    borderRadius: "30px",
    flexGrow: "1",
    display: "flex",
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
    marginBottom: "5px",
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
  navBar: {
    color: "white",
    padding: "10px",
    fontSize: "18px",
    border: "none",
    borderRadius: "30px",
    marginBottom: "5px",
  },
};

export default MainLayout;
