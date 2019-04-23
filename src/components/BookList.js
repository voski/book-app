import React, { Fragment } from "react";
import ListItem from "./ListItem";

/* component for the list of books */
function BookList({ books }) {
  // sometimes API returns same item.id with a different etag
  // combine both so react will stay happy and not complain about duplicate keys
  const bookItems = books.map(item => (
    <ListItem volumeInfo={item.volumeInfo} key={item.id + item.etag} />
  ));

  return <Fragment>{bookItems}</Fragment>;
}

export default BookList;
