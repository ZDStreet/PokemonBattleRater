import { Pokemon } from '@/types/pokemon';

const cache = new Map<string, any>();

export async function fetchRandomPair(): Promise<Pokemon[]> {
    const cacheKey = 'random-pair-' + Date.now(); // New key each time
    const res = await fetch('/pokemon/random');
    const data = await res.json();
    return data;
}

export async function searchPokemonApi(name: string): Promise<Pokemon> {
    const cacheKey = `pokemon-${name}`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    const res = await fetch('/pokemon/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name })
    });
    const data = await res.json();
    cache.set(cacheKey, data);
    return data;
}

export async function votePokemonApi(winner_id: number, loser_id: number): Promise<Response> {
    return fetch('/pokemon/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''
        },
        body: JSON.stringify({ winner_id, loser_id })
    });
}

export async function fetchPokemonList(): Promise<Pokemon[]> {
    const cacheKey = 'pokemon-list';
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    const res = await fetch('/pokemon/list');
    const data = await res.json();
    cache.set(cacheKey, data);
    return data;
} 