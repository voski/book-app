import React from "react";
import { render, fireEvent } from "react-testing-library";
import SearchForm from "../components/SearchForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(<SearchForm />, div);
});

it("should render placeholder text", () => {
  const message = "hello world!";
  const subject = render(<SearchForm placeholder={message} />);

  expect(subject.getByPlaceholderText(message)).toBeInTheDocument();
});

it("should render query text", () => {
  const query = "woop";
  // prevent 'Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler.'
  const onChange = jest.fn();

  const subject = render(<SearchForm query={query} onChange={onChange} />);
  const input = subject.getByValue(query);

  expect(input).toBeInTheDocument();
});

it("should call onChange handler when there is a change", () => {
  const message = "hello world!";
  const handler = jest.fn();

  const subject = render(
    <SearchForm placeholder={message} onChange={handler} />
  );

  const input = subject.getByPlaceholderText(message);
  fireEvent.change(input, { target: { value: "foobar" } });

  expect(handler).toHaveBeenCalledTimes(1);
});

it("should render button action", () => {
  const message = "click me";
  const subject = render(<SearchForm buttonAction={message} />);

  const button = subject.getByText(message);

  expect(button).toBeInTheDocument();
});

it("should fire onClick handler when button is clicked", () => {
  const message = "click me";
  const fn = jest.fn();
  const subject = render(<SearchForm buttonAction={message} onClick={fn} />);

  const button = subject.getByText(message);

  fireEvent.click(button);

  expect(fn).toHaveBeenCalledTimes(1);
});
