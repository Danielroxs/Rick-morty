import type { Character } from '../../types/character';
import { CharacterCard } from '../CharacterCard/CharacterCard';

type CharacterGridProps = {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
};

export function CharacterGrid({
  characters,
  onSelectCharacter,
}: CharacterGridProps) {
  if (characters.length === 0) {
    return <p className="empty-state">No hay personajes para mostrar.</p>;
  }

  return (
    <section className="character-grid">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onSelect={onSelectCharacter}
        />
      ))}
    </section>
  );
}