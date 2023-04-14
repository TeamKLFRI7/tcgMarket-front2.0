import "./layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ModalForm from "../../components/ModalForm";
import SearchBar from "../../components/SearchBar";
import NavBar from "./NavBar";
import Header from "./Header";

const MainLayout = (props) => {
  const location = useLocation();
  const viewportWidth = props.width;
  const viewportHeight = props.height;
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const [navBarHeight, setNavBarHeight] = useState(0);
  const searchBarRef = useRef(null);
  const navBarRef = useRef(null);
  const mainRef = useRef(null);

  const hiddenSearchLocation = ["/profil", "/vendre-mes-cartes"];
  let isSearchHidden =
    hiddenSearchLocation.includes(location.pathname) || viewportWidth >= 729;

  useEffect(() => {
    setNavBarHeight(navBarRef.current.clientHeight);

    if (!isSearchHidden) {
      setSearchBarHeight(searchBarRef.current?.clientHeight);
      mainRef.current.style.height = `calc(${viewportHeight}px - ${searchBarHeight}px - ${navBarHeight}px - 2rem)`;
    } else {
      mainRef.current.style.height = `calc(${viewportHeight}px - ${navBarHeight}px - 1rem)`;
    }
  }, [
    searchBarHeight,
    navBarHeight,
    isSearchHidden,
    viewportHeight,
    viewportWidth,
  ]);

  return (
    <div className={"mainLayout"}>
      {props.modalOpen && <ModalForm setModalOpen={props.setModalOpen} />}
      {viewportWidth >= 729 && (
        <Header setSearchResults={props.setSearchResults} ref={navBarRef} />
      )}
      {isSearchHidden ? null : (
        <SearchBar
          ref={searchBarRef}
          setSearchResults={props.setSearchResults}
        />
      )}
      <div className={"mainLayout-contentContainer"}>
        <div
          ref={mainRef}
          className={"mainLayout-content"}
          style={styles.height}
        >
          <Outlet />
        </div>
        {viewportWidth < 729 && <NavBar ref={navBarRef} />}
      </div>
    </div>
  );
};

const styles = {
  height: {
    height: "",
  },
};

export default MainLayout;
