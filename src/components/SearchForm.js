import React from "react";

function SearchForm({ onChange, placeholder, query, buttonAction, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={query}
      />
      <input type="submit" value={buttonAction} />
    </form>
  );
}

export default SearchForm;
