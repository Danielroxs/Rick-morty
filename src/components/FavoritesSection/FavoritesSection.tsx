import type { Character } from '../../types/character';
import { useFavorites } from '../../context/FavoritesContext';
import { CharacterGrid } from '../CharacterGrid/CharacterGrid';

type FavoritesSectionProps = {
  onSelectCharacter: (character: Character) => void;
};

export function FavoritesSection({ onSelectCharacter }: FavoritesSectionProps) {
  const { favorites } = useFavorites();

  return (
    <section className="favorites-section">
      <h2>Mis favoritos</h2>

      {favorites.length === 0 ? (
        <p className="empty-state">Todavía no agregaste personajes favoritos.</p>
      ) : (
        <CharacterGrid
          characters={favorites}
          onSelectCharacter={onSelectCharacter}
        />
      )}
    </section>
  );
}