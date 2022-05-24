import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

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
    async () => {
      renderWithRouter(<App />);

      const linkDetalhes = await screen.findByRole('link', { name: /More details/i });

      userEvent.click(linkDetalhes);

      // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do pokémon;
      const mapas = await screen.findAllByRole('img', { name: /pikachu location/i });
      expect(mapas[0]).toBeInTheDocument();
      expect(mapas[1]).toBeInTheDocument();

      // deverá existir um heading h2 com o texto Game Locations of <name>
      const gameLocations = await screen
        .findByRole('heading', { level: 2, name: /game Locations of pikachu/i });
      expect(gameLocations).toBeInTheDocument();

      // Todas as localizações do pokémon devem ser mostradas na seção de detalhes;
      const locationsLength = pokemons[0].foundAt.length;
      const mapasLength = mapas.length;
      expect(mapasLength).toEqual(locationsLength);

      // ser exibidos o nome da localização e uma imagem do mapa em cada localização;
      const locationA = await screen.findByText(/Kanto Viridian Forest/i);
      const locationB = await screen.findByText(/Kanto Power Plant/i);
      expect(locationA).toBeInTheDocument();
      expect(locationB).toBeInTheDocument();
      expect(mapas).toHaveLength(2);

      // A imagem da localização deve ter um atributo src com a URL da localização;
      expect(mapas[0]).toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png'));
      expect(mapas[1]).toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'));
    });

  it('se o usuário pode favoritar um pokémon através da página de detalhes',
    async () => {
      renderWithRouter(<App />);

      const linkDetalhes = await screen.findByRole('link', { name: /More details/i });

      userEvent.click(linkDetalhes);

      // O label do checkbox deve conter o texto Pokémon favoritado?;
      const checkboxLabel = await screen.findByLabelText(/pokémon favoritado/i);
      expect(checkboxLabel).toBeInTheDocument();

      // página deve exibir um checkbox que permite favoritar o pokémon;
      const favorite = screen.getByRole('checkbox');
      expect(favorite).toBeInTheDocument();
      userEvent.click(favorite);

      const favoritePage = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(favoritePage);

      const pikachu = await screen.findByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();

      const linkDetalhesA = await screen.findByRole('link', { name: /More details/i });
      userEvent.click(linkDetalhesA);
      userEvent.click(favorite);
      userEvent.click(favoritePage);

      expect(pikachu).not.toBeInTheDocument();
    });
});
