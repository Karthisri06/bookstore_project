import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import chaiDom from 'chai-dom';
import Header from './Header';  
import { chai } from 'vitest';

chai.use(chaiDom);

describe('Header', () => {
  it('renders Header text', () => {
    const { getByText } = render(<Header />);
    const footerText = getByText(/Online Bookstore/i);
    expect(footerText).to.exist;
  });
});