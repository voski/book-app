import React, { Component } from 'react';

// This is a component that allows you to hide/show it's children.
// when `show` is truthy this render it's children
export default ({show = false, children}) => (
  show && <React.Fragment>{children}</React.Fragment>
)
