<div id="rankingsSection" class="hidden">
    <div class="mb-8 text-center">
        <div class="inline-flex gap-2 items-center bg-white p-4 rounded-lg shadow">
            <input type="text" id="pokemonSearch" 
                   placeholder="Enter a Pokemon name to add" 
                   class="p-3 border rounded w-64">
            <button onclick="searchPokemon()" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Add Pokemon
            </button>
        </div>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="pokemonGrid">
    </div>
</div> 