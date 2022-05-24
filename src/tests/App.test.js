import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App', () => {
  it('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavPoke = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavPoke).toBeInTheDocument();
  });

  it('se o primeiro link possui o texto `Home`', () => {
    renderWithRouter(<App />);
    const navLinks = screen.getAllByRole('link');

    expect(navLinks[0]).toHaveTextContent(/home/i);
  });

  it('se o segundo link possui o texto `About`', () => {
    renderWithRouter(<App />);
    const navLinks = screen.getAllByRole('link');

    expect(navLinks[1]).toHaveTextContent(/about/i);
  });

  it('se o terceiro link possui o texto `Favorite Pokémons`', () => {
    renderWithRouter(<App />);
    const navLinks = screen.getAllByRole('link');

    expect(navLinks[2]).toHaveTextContent(/favorite pokémons/i);
  });

  it('se a aplicação é redirecionada para `/` ao clicar no link `Home`',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: /home/i });

      userEvent.click(linkHome);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });

  it('se a aplicação é redirecionada para `/about` ao clicar no link `About`',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: /about/i });

      userEvent.click(linkHome);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });

  it('se a aplicação é redirecionada para `/about` ao clicar no link `Favoritos`',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkFav = screen.getByRole('link', { name: /favorite pokémons/i });

      userEvent.click(linkFav);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

  it('se a aplicação é redirecionada para `Not Found` ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      act(() => { history.push('/pagina/que-nao-existe/'); });

      const notFoundTitle = screen.getByRole('heading',
        { level: 2, name: /Page requested not found/i });
      expect(notFoundTitle).toBeInTheDocument();
    });
});
