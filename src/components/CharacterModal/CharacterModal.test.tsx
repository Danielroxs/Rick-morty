import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { FavoritesProvider } from '../../context/FavoritesContext';
import { mockCharacter } from '../../test/mockCharacter';
import { CharacterModal } from './CharacterModal';

function renderModal(onClose = vi.fn()) {
  render(
    <FavoritesProvider>
      <CharacterModal character={mockCharacter} onClose={onClose} />
    </FavoritesProvider>,
  );

  return { onClose };
}

describe('CharacterModal', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('muestra la información detallada del personaje', () => {
    renderModal();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Estado: Alive')).toBeInTheDocument();
    expect(screen.getByText('Género: Male')).toBeInTheDocument();
    expect(screen.getByText('Especie: Human')).toBeInTheDocument();
    expect(screen.getByText('Origen: Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Ubicación: Citadel of Ricks')).toBeInTheDocument();
  });

  it('cierra el modal al hacer clic en Cerrar X', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderModal(onClose);

    await user.click(screen.getByRole('button', { name: /cerrar modal/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('cierra el modal al presionar Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderModal(onClose);

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('permite agregar el personaje a favoritos desde el modal', async () => {
    const user = userEvent.setup();

    renderModal();

    await user.click(
      screen.getByRole('button', { name: /agregar a favoritos/i }),
    );

    expect(
      screen.getByRole('button', { name: /eliminar de favoritos/i }),
    ).toBeInTheDocument();
  });
});