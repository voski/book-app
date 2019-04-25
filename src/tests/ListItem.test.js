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

it("should use default image as a fallback", () => {
  const thumbnail =
    "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
  const subject = render(<ListItem />);

  const img = subject.container.querySelector("img");
  expect(img).toBeInTheDocument();
  expect(img.src).toEqual(thumbnail);
});

it("should render publishedDate", () => {
  const publishedDate = "03-09-1989";
  const volumeInfo = { publishedDate };
  const subject = render(<ListItem volumeInfo={volumeInfo} />);

  expect(subject.queryByText(RegExp(`.*${publishedDate}`))).toBeInTheDocument();
});

it("should render publisher", () => {
  const publisher = "McGraw";
  const volumeInfo = { publisher };
  const subject = render(<ListItem volumeInfo={volumeInfo} />);

  expect(subject.queryByText(RegExp(`${publisher}.*`))).toBeInTheDocument();
});

it("should render infoLink", () => {
  const infoLink = "https://foobar.com/zanzabar";
  const volumeInfo = { infoLink };
  const subject = render(<ListItem volumeInfo={volumeInfo} />);
  const link = subject.container.querySelector("a");

  expect(link).toBeInTheDocument();
  expect(link.href).toEqual(infoLink);
  expect(link.target).toEqual("_blank");
  expect(link.rel).toEqual("noopener noreferrer");
});
