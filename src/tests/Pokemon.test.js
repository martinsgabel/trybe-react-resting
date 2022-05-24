import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokemon', () => {
  it('se é renderizado um card com as informações de determinado pokémon', async () => {
    renderWithRouter(<App />);

    const card = await screen.findByRole('link', { name: /More details/i });
    expect(card).toBeInTheDocument();

    // O nome correto do pokémon deve ser mostrado na tela;
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toContain('Pikachu');

    // O tipo correto do pokémon deve ser mostrado na tela.
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toContain('Electric');

    // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.innerHTML).toContain('Average weight: 6.0 kg');

    // A imagem do pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    const pokeImg = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg).toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'));
  });

  it(`Teste se o card do pokémon indicado na Pokédex contém um link 
  de navegação para exibir detalhes deste pokémon. 
  O link deve possuir a URL /pokemons/<id>,
  onde <id> é o id do pokémon exibido;`, async () => {
    renderWithRouter(<App />);

    const linkDetalhes = await screen.findByRole('link', { name: /More details/i });
    expect(linkDetalhes).toBeInTheDocument();
    expect(linkDetalhes).toHaveAttribute('href');
    expect(linkDetalhes.href).toContain('/pokemons/25');
  });

  it('se ao clicar no link de navegação do pokémon, é feito o redirecionamento',
    async () => {
      renderWithRouter(<App />);

      const linkDetalhes = await screen.findByRole('link', { name: /More details/i });

      userEvent.click(linkDetalhes);

      const detailPageTitle = await screen
        .findByRole('heading', { name: /pikachu details/i });
      expect(detailPageTitle).toBeInTheDocument();
    });

  it('se a URL exibida no navegador muda para /pokemon/<id>',
    async () => {
      const { history } = renderWithRouter(<App />);

      const linkDetalhes = await screen.findByRole('link', { name: /More details/i });

      userEvent.click(linkDetalhes);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/pokemons/25');
    });

  it('se existe um ícone de estrela nos pokémons favoritados', async () => {
    renderWithRouter(<App />);

    const linkDetails = await screen.findByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);

    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const linkHome = await screen.findByRole('link', { name: /home/i });
    userEvent.click(linkHome);

    const favStar = await screen
      .findByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favStar).toBeInTheDocument();

    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg
    expect(favStar).toHaveAttribute('src', expect.stringContaining('/star-icon.svg'));
  });
});
