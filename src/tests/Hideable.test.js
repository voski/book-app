import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import Hideable from '../components/Hideable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Hideable/>, div);
});

it('should render children when show is true', () => {
  const message = 'hello world!';
  const subject = render(
    <Hideable show={true}>
      {message}
    </Hideable>
  );

  expect(subject.getByText(message)).toBeInTheDocument();
});

it('should not render children when show is false', () => {
  const message = 'hello world!';
  const subject = render(
    <Hideable show={false}>
      {message}
    </Hideable>
  );

  expect(subject.queryByText(message)).not.toBeInTheDocument();
});
