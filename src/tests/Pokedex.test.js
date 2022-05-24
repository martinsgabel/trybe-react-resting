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

    const all = await screen.findAllByRole('button', { name: /all/i });
    expect(all[0]).toBeInTheDocument();
    expect(all).toHaveLength(1);

    const Electric = await screen.findAllByRole('button', { name: /Electric/i });
    expect(Electric[0]).toBeInTheDocument();
    expect(Electric).toHaveLength(1);

    const Fire = await screen.findAllByRole('button', { name: /Fire/i });
    expect(Fire[0]).toBeInTheDocument();
    expect(Fire).toHaveLength(1);

    const Bug = await screen.findAllByRole('button', { name: /Bug/i });
    expect(Bug[0]).toBeInTheDocument();
    expect(Bug).toHaveLength(1);

    const Poison = await screen.findAllByRole('button', { name: /Poison/i });
    expect(Poison[0]).toBeInTheDocument();
    expect(Poison).toHaveLength(1);

    const Psychic = await screen.findAllByRole('button', { name: /Psychic/i });
    expect(Psychic[0]).toBeInTheDocument();
    expect(Psychic).toHaveLength(1);

    const normal = await screen.findAllByRole('button', { name: /Normal/i });
    expect(normal[0]).toBeInTheDocument();
    expect(normal).toHaveLength(1);

    const dragonTestId = await screen.findAllByTestId('pokemon-type-button');
    const dragon = await screen.findAllByRole('button', { name: /dragon/i });
    expect(dragonTestId[6]).toBeInTheDocument();
    expect(dragonTestId[6]).toHaveTextContent(/dragon/i);
    expect(dragon).toHaveLength(1);
  });

  it('A partir da seleção a Pokédex deve circular somente pelos pokémons daquele tipo',
    async () => {
      renderWithRouter(<App />);

      const Fire = await screen.findByRole('button', { name: /Fire/i });
      userEvent.click(Fire);

      const charmander = await screen.findByText(/charmander/i);
      expect(charmander).toBeInTheDocument();

      const next = await screen.findByRole('button', { name: /próximo pokémon/i });
      userEvent.click(next);

      const rapidash = await screen.findByText(/rapidash/i);
      expect(rapidash).toBeInTheDocument();

      const all = await screen.findByRole('button', { name: /all/i });
      expect(all).toBeInTheDocument();
    });

  it('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    renderWithRouter(<App />);

    const all = await screen.findByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();
  });

  it('A Pokedéx deverá mostrar todos pokémons quando o botão All for clicado',
    async () => {
      renderWithRouter(<App />);

      const btnNext = await screen.findByRole('button', { name: /próximo pokémon/i });
      const filterAll = screen.getByRole('button', { name: /all/i });
      expect(filterAll).toBeInTheDocument();

      userEvent.click(filterAll);

      const pikachu = await screen.findByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();

      userEvent.click(btnNext);

      const charmander = await screen.findByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
    });

  it('Ao carregar a página, o filtro selecionado deverá ser All', async () => {
    renderWithRouter(<App />);

    const btnNext = await screen.findByRole('button', { name: /próximo pokémon/i });
    const pikachu = await screen.findByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    userEvent.click(btnNext);

    const charmander = await screen.findByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });
});
