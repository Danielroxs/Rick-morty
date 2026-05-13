import { useEffect } from 'react';
import type { Character } from '../../types/character';
import { useFavorites } from '../../context/FavoritesContext';
import './CharacterModal.css';

type CharacterModalProps = {
  character: Character;
  onClose: () => void;
};

export function CharacterModal({ character, onClose }: CharacterModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(character.id);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <article
        className="character-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="character-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="character-modal__close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          Cerrar X
        </button>

        <img
          className="character-modal__image"
          src={character.image}
          alt={character.name}
        />

        <h2 id="character-modal-title">{character.name}</h2>

        <div className="character-modal__details">
          <span>Estado: {character.status}</span>
          <span>Género: {character.gender}</span>
          <span>Especie: {character.species}</span>
          <span>Origen: {character.origin.name}</span>
          <span>Ubicación: {character.location.name}</span>
        </div>

        <button
          type="button"
          className={
            favorite
              ? 'character-modal__favorite is-favorite'
              : 'character-modal__favorite'
          }
          onClick={() => toggleFavorite(character)}
        >
          {favorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        </button>
      </article>
    </div>
  );
}