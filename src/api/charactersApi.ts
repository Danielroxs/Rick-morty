import type { CharactersApiResponse } from '../types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

type GetCharactersParams = {
  page: number;
  name?: string;
};

export async function getCharacters({
  page,
  name,
}: GetCharactersParams): Promise<CharactersApiResponse> {
  const params = new URLSearchParams();

  params.set('page', String(page));

  if (name?.trim()) {
    params.set('name', name.trim());
  }

  const response = await fetch(`${BASE_URL}/character?${params.toString()}`);

  if (!response.ok) {
    throw new Error('No se pudieron obtener los personajes');
  }

  return response.json();
}