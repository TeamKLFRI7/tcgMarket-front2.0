import { forwardRef, useEffect, useState } from "react";
import { useSearchCard } from "../axios";

const SearchBar = forwardRef((props, ref) => {
  const [query, setQuery] = useState("");
  const data = useSearchCard(query);

  useEffect(() => {
    props.setSearchResults(data);
    if (data?.length < 3) {
      props.setSearchResults(null);
    }
  });
  return (
    <>
      <input
        ref={ref}
        style={styles.searchBar}
        placeholder="Entrez le nom d'une carte"
        onChange={(e) => setQuery(e.target.value)}
        id={"searchBar"}
      />
      <div className="dropdownMenu">
        <div className="dropdownContent">
          <a href="#" className="dropdownItem"></a>
        </div>
      </div>
    </>
  );
});

const styles = {
  searchBar: {
    backgroundColor: "#fff",
    padding: "20px",
    fontSize: "18px",
    borderRadius: "62px",
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    margin: ".5rem 0 .5rem",
  },
  dropdownMenu: {
    display: "block",
    maxHeight: "300px",
    overflow: "auto",
    minWidth: "12rem",
    position: "static",
  },
  dropdownContent: {
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow:
      "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%)",
    paddingBottom: "0.5rem",
    paddingTop: "0.5rem",
  },
  dropdownItem: {
    paddingRight: "3rem",
    width: "100%",
    fontSize: ".9rem",
    lineHeight: "1.5rem",
    padding: ".4rem 1rem",
    position: "relative",
    cursor: "pointer",
    whiteSpace: "pre-line!important",
    fontWeight: "700",
  },
  a: {
    textDecoration: "none",
  },
};

export default SearchBar;
