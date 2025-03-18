<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use App\Services\PokemonService;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    private $pokemonService;

    public function __construct(PokemonService $pokemonService)
    {
        $this->pokemonService = $pokemonService;
    }

    public function search(Request $request)
    {
        try {
            $name = strtolower($request->input('name'));
            $pokemon = $this->pokemonService->findOrCreatePokemon($name);
            return response()->json($pokemon);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while searching for Pokemon'], 500);
        }
    }

    public function getRandomPair()
    {
        return response()->json($this->pokemonService->getRandomPair());
    }

    public function vote(Request $request)
    {
        $winner = Pokemon::find($request->input('winner_id'));
        $loser = Pokemon::find($request->input('loser_id'));
        
        $this->pokemonService->updateRatings($winner, $loser);
        
        return response()->json(['success' => true]);
    }

    public function list()
    {
        $pokemon = Pokemon::orderBy('rating', 'desc')->get();
        return response()->json($pokemon);
    }
} 