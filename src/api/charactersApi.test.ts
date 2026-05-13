import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCharacters } from './charactersApi';

describe('getCharacters', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('consulta personajes con página y nombre', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        info: {
          count: 1,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [],
      }),
    } as Response);

    const result = await getCharacters({
      page: 2,
      name: 'rick',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?page=2&name=rick',
    );

    expect(result.info.pages).toBe(1);
    expect(result.results).toEqual([]);
  });

  it('lanza error cuando la API responde con error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    await expect(
      getCharacters({
        page: 1,
        name: 'unknown-character',
      }),
    ).rejects.toThrow('No se pudieron obtener los personajes');
  });
});