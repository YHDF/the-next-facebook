'use client'

import React, { useState } from "react";
import Search from "./search";
import Result from "./result";

export default function Dashboard() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <Search setSearchResults={setSearchResults} />
      {searchResults.length > 0 ? (
        <Result searchResults={searchResults} />
      ) : (
        <div style={{color : 'white', textAlign : 'center'}}>No results found.</div>
      )}
    </>
  );
}
