import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedex', () => {
  it('se contém um heading h2 com o texto', async () => {
    renderWithRouter(<App />);

    const heading2 = await screen
      .findByRole('heading', { level: 2, name: /encountered pokémons/i });

    expect(heading2).toBeInTheDocument();
  });

  it('se é exibido o próximo pokémon da lista quando o botão é clicado', async () => {
    renderWithRouter(<App />);

    const btnProximo = await screen.findByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnProximo);

    expect(btnProximo).toBeInTheDocument();
    const proxPokemon = await screen.findByText('Charmander');
    expect(proxPokemon).toBeInTheDocument();
  });

  it('O botão deve conter o texto Próximo pokémon', async () => {
    renderWithRouter(<App />);

    const btnProximo = await screen.findByRole('button', { name: /próximo pokémon/i });
    expect(btnProximo).toBeInTheDocument();
  });

  it('Os próximos pokémons devem ser mostrados ao clicar sucessivamente no botão',
    async () => {
      renderWithRouter(<App />);

      const btnProximo = await screen.findByRole('button', { name: /próximo pokémon/i });

      pokemons.forEach((pokemon) => {
        const { name } = pokemon;

        const currPoke = screen.getByTestId('pokemon-name');
        expect(currPoke.innerHTML).toContain(name);
        userEvent.click(btnProximo);
      });
    });

  it('Teste se é mostrado apenas um pokémon por vez', async () => {
    renderWithRouter(<App />);

    const onlyCard = await screen.findAllByRole('link', { name: /More details/i });

    expect(onlyCard).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', async () => {
    renderWithRouter(<App />);

    const all = await screen.findByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();

    const Electric = await screen.findByRole('button', { name: /Electric/i });
    expect(Electric).toBeInTheDocument();

    const Fire = await screen.findByRole('button', { name: /Fire/i });
    expect(Fire).toBeInTheDocument();

    const Bug = await screen.findByRole('button', { name: /Bug/i });
    expect(Bug).toBeInTheDocument();

    const Poison = await screen.findByRole('button', { name: /Poison/i });
    expect(Poison).toBeInTheDocument();

    const Psychic = await screen.findByRole('button', { name: /Psychic/i });
    expect(Psychic).toBeInTheDocument();

    const Normal = await screen.findByRole('button', { name: /Normal/i });
    expect(Normal).toBeInTheDocument();

    const Dragon = await screen.findByRole('button', { name: /Dragon/i });
    expect(Dragon).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    renderWithRouter(<App />);

    const all = await screen.findByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();
  });
});

/*
A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado; (como checar se apenas mostra um pokemon por vez?)

Ao carregar a página, o filtro selecionado deverá ser All; (Como checar se ele esta selecionado?)

(o que os erros significam)
*/
