import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('App', () => {
  it('se é exibido mensagem, caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const msg = screen.getByText('No favorite pokemon found');

    expect(msg).toBeInTheDocument();
  });

  it('se é exibido os pokémons favoritos', async () => {
    renderWithRouter(<App />);

    const moreDetails = await screen.findByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const favoritePage = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePage);

    const favCards = await screen.findAllByRole('link', { name: /more details/i });
    const favLength = favCards.length;
    expect(favCards).toHaveLength(favLength);
  });
});
