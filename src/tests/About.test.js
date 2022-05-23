import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('About', () => {
  const infoTextA = (
    'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons'
  );

  const infoTextB = (
    'One can filter Pokémons by type, and see more details for each one of them'
  );

  it('se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexInfoA = screen.getByText(infoTextA);
    const pokedexInfoB = screen.getByText(infoTextB);

    expect(pokedexInfoA).toBeInTheDocument();
    expect(pokedexInfoB).toBeInTheDocument();
  });

  it('se contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const headingTitle = screen
      .getByRole('heading', { level: 2, name: /About Pokédex/i });

    expect(headingTitle).toBeInTheDocument();
  });

  it('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const text = container.querySelectorAll('p');

    expect(text).toHaveLength(2);
  });

  it('se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
