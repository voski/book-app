import React, { Fragment } from "react";

// TODO: wrap this in a form tag, make it so hitting enter with the input focused submits the form
function SearchForm({ onChange, placeholder, query, buttonAction, onClick }) {
  return (
    <Fragment>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={query}
      />
      <button onClick={onClick}>{buttonAction}</button>
    </Fragment>
  );
}

export default SearchForm;
