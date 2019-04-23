import React from "react";
import { render } from "react-testing-library";
import ListItem from "../components/ListItem";

it("renders without crashing", () => {
  render(<ListItem />);
});

it("should render title", () => {
  const title = "Tiger Woods";
  const volumeInfo = { title };
  const subject = render(<ListItem volumeInfo={volumeInfo} />);
  expect(subject.queryByText(title)).toBeInTheDocument();
});

it("should render subtitle", () => {
  const title = "original title";
  const subtitle = "original subtitle";
  const volumeInfo = { title, subtitle };
  const subject = render(<ListItem volumeInfo={volumeInfo} />);
  expect(subject.queryByText(`${title}: ${subtitle}`)).toBeInTheDocument();
});

it("should render authors", () => {
  const authors = ["narbe", "narb"];
  const volumeInfo = { authors };
  const subject = render(<ListItem volumeInfo={volumeInfo} />);

  expect(subject.queryByText(authors.join(", "))).toBeInTheDocument();
});

it("should render fallback text when there is no author info", () => {
  const subject = render(<ListItem />);
  expect(subject.queryByText("unknown")).toBeInTheDocument();
});

it("should render imageLinks", () => {
  const thumbnail = "https://test.com/images/test.gif";
  const imageLinks = { thumbnail };
  const volumeInfo = { imageLinks };
  const subject = render(<ListItem volumeInfo={volumeInfo} />);

  const img = subject.container.querySelector("img");
  expect(img).toBeInTheDocument();
  expect(img.src).toEqual(thumbnail);
});
// it("should use default image as a fallback");
// it("should render publishedDate");
// it("should render publisher");
// it("should render infoLink");
