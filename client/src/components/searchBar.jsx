import React from "react";
import "../style/searchBar.css";

const SearchBar = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
  }

  return (
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" className="search-input"/>
          <button className="search-button">Search</button>
        </form>
      </div>
  )
}

export default SearchBar;