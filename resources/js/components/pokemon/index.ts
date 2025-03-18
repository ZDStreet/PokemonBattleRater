import { Pokemon, VoteInfo } from '@/types/pokemon';
import * as api from './api';
import * as ui from './ui';

export function checkForPokemon(): void {
    api.fetchRandomPair()
        .then(pokemon => {
            if (pokemon && pokemon.length > 0) {
                const battleSection = document.getElementById('battleSection');
                if (battleSection) {
                    battleSection.classList.remove('hidden');
                    ui.displayPokemon(pokemon[0], 'pokemon1');
                    ui.displayPokemon(pokemon[1], 'pokemon2');
                }
            }
        });
}

function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export const searchPokemon = debounce((): void => {
    const input = document.getElementById('pokemonSearch') as HTMLInputElement;
    if (!input) return;

    const name = input.value.trim().toLowerCase();
    
    if (!name) {
        handleInputError(input);
        return;
    }

    api.searchPokemonApi(name)
        .then(data => {
            if ('error' in data) {
                handleInputError(input);
            } else {
                handleSearchSuccess(input);
                loadPokemonList();
            }
        })
        .catch(() => handleInputError(input));
}, 300);

function handleInputError(input: HTMLInputElement): void {
    input.classList.add('border-red-500');
    setTimeout(() => input.classList.remove('border-red-500'), 2000);
}

function handleSearchSuccess(input: HTMLInputElement): void {
    input.value = '';
    input.classList.add('border-green-500');
    setTimeout(() => input.classList.remove('border-green-500'), 1000);
}

export function loadRandomPair(): void {
    api.fetchRandomPair()
        .then(pokemon => {
            ui.displayPokemon(pokemon[0], 'pokemon1');
            ui.displayPokemon(pokemon[1], 'pokemon2');
        });
}

export function votePokemon(winnerId: number): void {
    const { loserId, winnerCard } = getVoteInfo(winnerId);
    disableVoteButtons();
    highlightWinner(winnerCard);
    
    api.votePokemonApi(winnerId, parseInt(loserId))
        .then(() => {
            setTimeout(() => {
                winnerCard.classList.remove('ring-4', 'ring-green-500');
                loadRandomPair();
            }, 500);
        });
}

function getVoteInfo(winnerId: number): VoteInfo {
    const pokemon1 = document.getElementById('pokemon1');
    const pokemon2 = document.getElementById('pokemon2');
    
    if (!pokemon1 || !pokemon2) {
        throw new Error('Pokemon elements not found');
    }

    const button1 = pokemon1.querySelector('button');
    const button2 = pokemon2.querySelector('button');

    if (!button1?.onclick || !button2?.onclick) {
        throw new Error('Vote buttons not found or onclick not set');
    }

    const id1 = button1.onclick.toString().match(/\d+/)?.[0];
    const id2 = button2.onclick.toString().match(/\d+/)?.[0];

    if (!id1 || !id2) {
        throw new Error('Pokemon IDs not found');
    }
    
    return {
        loserId: (winnerId.toString() === id1) ? id2 : id1,
        winnerCard: (winnerId.toString() === id1) ? pokemon1 : pokemon2
    };
}

function disableVoteButtons(): void {
    const buttons = document.querySelectorAll('#pokemon1 button, #pokemon2 button');
    buttons.forEach(button => {
        if (button instanceof HTMLButtonElement) {
            button.disabled = true;
        }
    });
}

function highlightWinner(winnerCard: HTMLElement): void {
    winnerCard.classList.add('ring-4', 'ring-green-500');
}

export function toggleView(): void {
    const battleSection = document.getElementById('battleSection');
    const rankingsSection = document.getElementById('rankingsSection');
    const toggleBtn = document.getElementById('viewToggleBtn');
    
    if (!battleSection || !rankingsSection || !toggleBtn) return;

    if (battleSection.classList.contains('hidden')) {
        showBattleView(battleSection, rankingsSection, toggleBtn);
    } else {
        showRankingsView(battleSection, rankingsSection, toggleBtn);
    }
}

function showBattleView(
    battleSection: HTMLElement, 
    rankingsSection: HTMLElement, 
    toggleBtn: HTMLElement
): void {
    battleSection.classList.remove('hidden');
    rankingsSection.classList.add('hidden');
    toggleBtn.textContent = 'See All Pokemon';
}

function showRankingsView(
    battleSection: HTMLElement, 
    rankingsSection: HTMLElement, 
    toggleBtn: HTMLElement
): void {
    loadPokemonList();
    battleSection.classList.add('hidden');
    rankingsSection.classList.remove('hidden');
    toggleBtn.textContent = 'Switch to Rating';
}

export function loadPokemonList(): void {
    api.fetchPokemonList()
        .then(pokemon => {
            const grid = document.getElementById('pokemonGrid');
            if (grid) {
                grid.innerHTML = ui.renderPokemonList(pokemon);
            }
        });
} 