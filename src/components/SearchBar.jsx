import { forwardRef, useEffect, useState } from "react";
import { useSearchCard } from "../axios";
import "./css/searchBar.css";

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
        className={"searchBar"}
        placeholder="Entrez le nom d'une carte"
        onChange={(e) => setQuery(e.target.value)}
        id={"searchBar"}
      />
      {/*<div className="dropDown">*/}
      {/*  <div className="dropDown-content">*/}
      {/*    <a href="#" className="dropDown-item"></a>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
});

export default SearchBar;
