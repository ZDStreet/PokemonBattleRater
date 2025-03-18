import * as Pokemon from './components/pokemon';

declare global {
    interface Window {
        checkForPokemon: typeof Pokemon.checkForPokemon;
        searchPokemon: typeof Pokemon.searchPokemon;
        loadRandomPair: typeof Pokemon.loadRandomPair;
        votePokemon: typeof Pokemon.votePokemon;
        toggleView: typeof Pokemon.toggleView;
        loadPokemonList: typeof Pokemon.loadPokemonList;
    }
}

// Make functions globally available
window.checkForPokemon = Pokemon.checkForPokemon;
window.searchPokemon = Pokemon.searchPokemon;
window.loadRandomPair = Pokemon.loadRandomPair;
window.votePokemon = Pokemon.votePokemon;
window.toggleView = Pokemon.toggleView;
window.loadPokemonList = Pokemon.loadPokemonList; 