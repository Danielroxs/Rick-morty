import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { FavoritesProvider } from '../../context/FavoritesContext';
import { mockCharacter } from '../../test/mockCharacter';
import { CharacterCard } from './CharacterCard';

function renderCharacterCard() {
  const onSelect = vi.fn();

  render(
    <FavoritesProvider>
      <CharacterCard character={mockCharacter} onSelect={onSelect} />
    </FavoritesProvider>,
  );

  return { onSelect };
}

describe('CharacterCard', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renderiza el nombre y la imagen del personaje', () => {
    renderCharacterCard();

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
  });

  it('ejecuta onSelect cuando se hace clic en la card', async () => {
    const user = userEvent.setup();
    const { onSelect } = renderCharacterCard();

    await user.click(screen.getByRole('button', { name: /^rick sanchez$/i }));

    expect(onSelect).toHaveBeenCalledWith(mockCharacter);
  });

  it('agrega y elimina el personaje de favoritos', async () => {
    const user = userEvent.setup();

    renderCharacterCard();

    const addButton = screen.getByRole('button', {
      name: /agregar rick sanchez a favoritos/i,
    });

    await user.click(addButton);

    expect(
      screen.getByRole('button', {
        name: /eliminar rick sanchez de favoritos/i,
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: /eliminar rick sanchez de favoritos/i,
      }),
    );

    expect(
      screen.getByRole('button', {
        name: /agregar rick sanchez a favoritos/i,
      }),
    ).toBeInTheDocument();
  });
});