import React from "react";

/* component for each individual book result */
function ListItem({ volumeInfo = {} }) {
  const {
    title,
    subtitle,
    authors,
    imageLinks,
    publishedDate,
    publisher,
    infoLink
  } = volumeInfo;
  const completeTitle = subtitle ? `${title}: ${subtitle}` : title;
  const authorNames = (authors || ["unknown"]).join(", ");
  const img =
    (imageLinks && imageLinks.thumbnail) ||
    "https://books.google.com/googlebooks/images/no_cover_thumb.gif";

  return (
    <div className="book-item">
      <h3>{completeTitle}</h3>
      <section className="book-info">
        <a href={infoLink} target="_blank" rel="noopener noreferrer">
          <img src={img} alt="book cover" />
        </a>

        <section className="book-info-details">
          <p>{authorNames}</p>
          <p>
            {publisher} - {publishedDate}
          </p>
        </section>
      </section>
    </div>
  );
}

export default ListItem;
