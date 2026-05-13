import { useEffect, useState } from 'react';
import { getCharacters } from '../api/charactersApi';
import type { Character } from '../types/character';

type UseCharactersParams = {
  page: number;
  search: string;
};

export function useCharacters({ page, search }: UseCharactersParams) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadCharacters() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCharacters({ page, name: search });

        if (!ignore) {
          setCharacters(data.results);
          setTotalPages(data.info.pages);
        }
      } catch {
        if (!ignore) {
          setCharacters([]);
          setTotalPages(1);
          setError('No se encontraron personajes');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadCharacters();

    return () => {
      ignore = true;
    };
  }, [page, search]);

  return {
    characters,
    totalPages,
    isLoading,
    error,
  };
}