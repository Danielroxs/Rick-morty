import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

function createStorageMock(): Storage {
  let store: Record<string, string> = {};

  return {
    get length() {
      return Object.keys(store).length;
    },

    clear: vi.fn(() => {
      store = {};
    }),

    getItem: vi.fn((key: string) => {
      return store[key] ?? null;
    }),

    key: vi.fn((index: number) => {
      return Object.keys(store)[index] ?? null;
    }),

    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),

    setItem: vi.fn((key: string, value: string) => {
      store[key] = String(value);
    }),
  } as unknown as Storage;
}

const localStorageMock = createStorageMock();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  configurable: true,
});

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  configurable: true,
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.clearAllMocks();
});