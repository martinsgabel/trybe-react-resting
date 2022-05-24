import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('PokemonDetails', () => {
  it('se as informações detalhadas do pokémon selecionado são mostradas na tela.',
    async () => {
      renderWithRouter(<App />);

      const linkDetalhes = await screen.findByRole('link', { name: /More details/i });

      userEvent.click(linkDetalhes);

      const detailPageTitle = await screen
        .findByRole('heading', { name: /pikachu details/i });
      expect(detailPageTitle).toBeInTheDocument();
      // Não deve existir o link de navegação para os detalhes do pokémon selecionado.
      expect(linkDetalhes).not.toBeInTheDocument();

      // A seção de detalhes deve conter um heading h2 com o texto Summary.
      const summary = await screen.findByRole('heading', { level: 2, name: /summary/i });
      expect(summary).toBeInTheDocument();

      // A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado.
      const paraAbout = await screen
        .findByText(/This intelligent Pokémon roasts hard berries/i);
      expect(paraAbout).toBeInTheDocument();
    });

  it('se existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {

    });
});
