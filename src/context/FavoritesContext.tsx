import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Character } from '../types/character';

type FavoritesContextValue = {
  favorites: Character[];
  isFavorite: (characterId: number) => boolean;
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: number) => void;
  toggleFavorite: (character: Character) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = 'singular-rick-morty:favorites';

function getInitialFavorites(): Character[] {
  try {
    const storedFavorites = window.localStorage.getItem(STORAGE_KEY);

    if (!storedFavorites) {
      return [];
    }

    return JSON.parse(storedFavorites) as Character[];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Character[]>(getInitialFavorites);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(characterId: number) {
    return favorites.some((favorite) => favorite.id === characterId);
  }

  function addFavorite(character: Character) {
    setFavorites((currentFavorites) => {
      const alreadyExists = currentFavorites.some(
        (favorite) => favorite.id === character.id,
      );

      if (alreadyExists) {
        return currentFavorites;
      }

      return [...currentFavorites, character];
    });
  }

  function removeFavorite(characterId: number) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.id !== characterId),
    );
  }

  function toggleFavorite(character: Character) {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
      return;
    }

    addFavorite(character);
  }

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }

  return context;
}