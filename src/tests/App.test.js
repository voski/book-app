import React from 'react';
import { render } from 'react-testing-library';
import App from '../components/App';

it('renders without crashing', () => {
  render(<App />);
});
