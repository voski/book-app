const API = "https://www.googleapis.com/books/v1/volumes";

const query = ({ maxResults, startIndex = 0, query }) => {
  const params = `?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`;
  const url = API + params;

  return fetch(url).then(resp => {
      if (resp.ok) {
          return resp.json();
      }

      // maybe make this a specific kind of error?
      throw new Error("Error searching for books");
  });
};

export default query;