import { useEffect, useState } from 'react';
import { CharacterGrid } from './components/CharacterGrid/CharacterGrid';
import { CharacterModal } from './components/CharacterModal/CharacterModal';
import { FavoritesSection } from './components/FavoritesSection/FavoritesSection';
import { Pagination } from './components/Pagination/Pagination';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useCharacters } from './hooks/useCharacters';
import { useDebounce } from './hooks/useDebounce';
import type { Character } from './types/character';

function App() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  const debouncedSearch = useDebounce(search, 400);

  const { characters, totalPages, isLoading, error } = useCharacters({
    page: currentPage,
    search: debouncedSearch,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return (
    <main className="app">
      <header className="app__header">
      <p className="app__eyebrow">Rick and Morty API</p>
      <h1>Interdimensional Character Database</h1>
      <p>Explora personajes, abre portales y guarda tus favoritos.</p>
    </header>

      <section className="toolbar">
        <SearchBar value={search} onChange={setSearch} />

        <a className="favorites-link" href="#favorites">
          Mis favoritos ★
        </a>
      </section>

      {isLoading && <p className="status-message">Cargando personajes...</p>}

      {error && !isLoading && <p className="status-message">{error}</p>}

      {!isLoading && !error && (
        <>
          <CharacterGrid
            characters={characters}
            onSelectCharacter={setSelectedCharacter}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <section id="favorites">
        <FavoritesSection onSelectCharacter={setSelectedCharacter} />
      </section>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </main>
  );
}

export default App;