import React from 'react';
import { render } from 'react-testing-library';
import BookList from '../components/BookList';

it('renders without crashing', () => {
  render(<BookList/>);
});

it('renders passed in books', () => {
    const bookOne = {
        id: '1',
        etag: 'tag1',
        volumeInfo: {
            title: 'book one'
        }
    }
    const bookTwo = {
        id: '2',
        etag: 'tag2',
        volumeInfo: {
            title: 'book two'
        }
    }

    const subject = render(<BookList books={[bookOne, bookTwo]}/>);
    expect(subject).toMatchSnapshot();
  });
  