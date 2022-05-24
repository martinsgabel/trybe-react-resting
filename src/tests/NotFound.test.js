import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components'; 

describe('NotFound', () => {
  it('se a página contém um heading h2 com o texto', () => {
    renderWithRouter(<NotFound />);

    const text = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(text).toBeInTheDocument();
  });

  it('se mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen
      .getByRole('img',
        { name: 'Pikachu crying because the page requested was not found' });
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
