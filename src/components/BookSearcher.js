import React, { Component, Fragment } from "react";
import SearchForm from "./SearchForm";
import Hideable from "./Hideable";
import BookList from "./BookList";
import queryBooksApi from "../api/GoogleBooks";

//main component arranges child components and holds state
class BookSearcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      itemsPerPage: 10,
      books: [],
      showError: false,
      showMore: false
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  // handles changes to input field
  handleSearchChange(event) {
    event.preventDefault();
    this.setState({ query: event.target.value });
  }

  // click handler for search button
  // clears out existing results and performs search
  handleSearchClick(event) {
    event.preventDefault();
    this.setState({ books: [], showMore: false }, this.searchInitial);
  }

  // click handler for the more button
  // appends existing results with new ones
  handleShowMore(event) {
    event.preventDefault();
    this.fetchFromGoogle()
      .then(json =>
        this.setState((prevState, props) => {
          const newBooks = json.items.slice(0, prevState.itemsPerPage);
          return {
            books: prevState.books.concat(newBooks),
            showMore: json.items.length > prevState.itemsPerPage,
            showError: false
          };
        })
      )
      .catch(error => this.setState({ showError: true }));
  }

  // performs search against google when we are not using "show more"
  // replaces existing results w/ new ones
  searchInitial() {
    this.fetchFromGoogle()
      .then(json =>
        this.setState((prevState, props) => {
          const newBooks = json.items.slice(0, prevState.itemsPerPage);
          const newState = {
            books: newBooks,
            showError: false,
            showMore: json.items.length > prevState.itemsPerPage
          };
          console.log(newState);
          return newState;
        })
      )
      .catch(error => this.setState({ books: [], showError: true }));
  }

  // performs get request from google api and formats response
  // will throw error in case of failure while requesting data
  fetchFromGoogle() {
    // get one extra so we know if we need to paginate
    const maxResults = this.state.itemsPerPage + 1;

    // indexes start at 0
    // If we have 10 books so far the last books index will be 9.
    // So we can always just make the start index the # of books so far
    const startIndex = this.state.books.length;
    const query = this.state.query;
    return queryBooksApi({query, maxResults, startIndex});
  }

  render() {
    return (
      <Fragment>
        <header>
          <h1>Search For Books</h1>
          <SearchForm
            buttonAction="search"
            placeholder="Title, ISBN, Author, ..."
            onChange={this.handleSearchChange}
            query={this.state.query}
            onSubmit={this.handleSearchClick}
          />
        </header>

        <main>
          <Hideable show={this.state.showError} />
          <BookList books={this.state.books} />
        </main>

        <footer>
          {this.state.showMore && (
            <button onClick={this.handleShowMore}>Show More</button>
          )}
        </footer>
      </Fragment>
    );
  }
}

export default BookSearcher;
