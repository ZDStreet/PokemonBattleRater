import { Pokemon } from '@/types/pokemon';

// Cache DOM elements
const elements = new Map<string, HTMLElement>();

function getElement(id: string): HTMLElement | null {
    if (!elements.has(id)) {
        const element = document.getElementById(id);
        if (element) {
            elements.set(id, element);
        }
    }
    return elements.get(id) || null;
}

export function displayPokemon(pokemon: Pokemon, elementId: string): void {
    const element = getElement(elementId);
    if (element) {
        element.innerHTML = renderPokemonCard(pokemon);
    }
}

export function renderPokemonCard(pokemon: Pokemon): string {
    return `
        <div class="text-center">
            <img src="${pokemon.sprite_url}" class="mx-auto w-32 h-32 mb-4">
            <h2 class="text-2xl font-bold capitalize mb-2">${pokemon.name}</h2>
            <div class="text-lg text-purple-600 font-semibold mb-4">Rating: ${pokemon.rating}</div>
            ${renderPokemonStats(pokemon)}
            <button onclick="votePokemon(${pokemon.id})" 
                    class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">
                Vote for ${pokemon.name}!
            </button>
        </div>
    `;
}

export function renderPokemonStats(pokemon: Pokemon): string {
    return `
        <div class="grid grid-cols-2 gap-4 text-sm mb-4">
            <div class="bg-gray-50 p-2 rounded">
                <div class="font-bold">HP</div>
                <div>${pokemon.hp}</div>
            </div>
            <div class="bg-gray-50 p-2 rounded">
                <div class="font-bold">Attack</div>
                <div>${pokemon.attack}</div>
            </div>
            <div class="bg-gray-50 p-2 rounded">
                <div class="font-bold">Defense</div>
                <div>${pokemon.defense}</div>
            </div>
            <div class="bg-gray-50 p-2 rounded">
                <div class="font-bold">Speed</div>
                <div>${pokemon.speed}</div>
            </div>
        </div>
    `;
}

    export function renderPokemonList(pokemon: Pokemon[]): string {
        return pokemon.map(p => `
            <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                <img src="${p.sprite_url}" class="w-24 h-24">
                <h3 class="text-lg font-bold capitalize mt-2">${p.name}</h3>
                <div class="text-2xl font-bold text-purple-600 my-2">
                    ${p.rating}
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div class="bg-blue-500 rounded-full h-2" style="width: ${p.hp/2}%"></div>
                </div>
                ${renderPokemonStats(p)}
            </div>
        `).join('');
}

// Pre-compile templates
const statsTemplate = (pokemon: Pokemon) => `
    <div class="grid grid-cols-2 gap-4 text-sm mb-4">
        <div class="bg-gray-50 p-2 rounded">
            <div class="font-bold">HP</div>
            <div>${pokemon.hp}</div>
        </div>
        <div class="bg-gray-50 p-2 rounded">
            <div class="font-bold">Attack</div>
            <div>${pokemon.attack}</div>
        </div>
        <div class="bg-gray-50 p-2 rounded">
            <div class="font-bold">Defense</div>
            <div>${pokemon.defense}</div>
        </div>
        <div class="bg-gray-50 p-2 rounded">
            <div class="font-bold">Speed</div>
            <div>${pokemon.speed}</div>
        </div>
    </div>
`; 