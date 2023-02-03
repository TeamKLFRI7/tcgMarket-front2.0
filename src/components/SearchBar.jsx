import {useEffect, useRef, useState} from "react";

const SearchBar = (props) => {

    const ref = useRef(null);

    useEffect(() => {
        const searchBarHeight = ref.current.getBoundingClientRect().height;
        props.setSearchHeight(searchBarHeight);
    }, [ref, props.setSearchHeight]);


  return (
    <input ref={ref} style={styles.searchBar} placeholder="SearchBar" id={'searchBar'}/>
  )
}

const styles = {
    searchBar: {
        backgroundColor: '#fff',
        padding: '20px',
        fontSize: '18px',
        borderRadius: '62px',
        border: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        margin: '.5rem 0 .5rem',
    }
}

export default SearchBar