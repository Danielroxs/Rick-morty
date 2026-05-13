import type { Character } from '../../types/character';
import { useFavorites } from '../../context/FavoritesContext';
import './CharacterCard.css';

type CharacterCardProps = {
  character: Character;
  onSelect: (character: Character) => void;
};

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(character.id);

  return (
    <article
        className="character-card"
        aria-label={character.name}
        onClick={() => onSelect(character)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
            onSelect(character);
            }
        }}
    >
      <img
        className="character-card__image"
        src={character.image}
        alt={character.name}
      />

      <div className="character-card__footer">
        <h3>{character.name}</h3>

        <button
          type="button"
          className={favorite ? 'favorite-button is-favorite' : 'favorite-button'}
          aria-label={
            favorite
              ? `Eliminar ${character.name} de favoritos`
              : `Agregar ${character.name} a favoritos`
          }
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(character);
          }}
        >
          ★
        </button>
      </div>
    </article>
  );
}