import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import chaiDom from 'chai-dom';
import Footer from './Footer';  
import { chai } from 'vitest';

chai.use(chaiDom);

describe('Footer', () => {
  it('renders footer text', () => {
    const { getByText } = render(<Footer />);
    const footerText = getByText(/© 2025 Online Bookstore. All rights reserved./i);
    expect(footerText).to.exist;
  });
});
