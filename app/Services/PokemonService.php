<?php

namespace App\Services;

use App\Models\Pokemon;
use Illuminate\Support\Facades\Http;
use App\Repositories\PokemonRepository;

class PokemonService
{
    private $repository;

    public function __construct(PokemonRepository $repository)
    {
        $this->repository = $repository;
    }

    public function findOrCreatePokemon(string $name): Pokemon
    {
        $pokemon = $this->repository->findByName($name);
        
        if (!$pokemon) {
            $pokemon = $this->createFromApi($name);
        }
        
        return $pokemon;
    }

    private function createFromApi(string $name): Pokemon
    {
        $response = Http::withoutVerifying()->get("https://pokeapi.co/api/v2/pokemon/{$name}");
        
        if (!$response->successful()) {
            throw new \Exception('Pokemon not found');
        }

        $data = $response->json();
        
        return Pokemon::create([
            'name' => $name,
            'sprite_url' => $data['sprites']['front_default'],
            'hp' => $data['stats'][0]['base_stat'],
            'attack' => $data['stats'][1]['base_stat'],
            'defense' => $data['stats'][2]['base_stat'],
            'special_attack' => $data['stats'][3]['base_stat'],
            'special_defense' => $data['stats'][4]['base_stat'],
            'speed' => $data['stats'][5]['base_stat'],
        ]);
    }

    public function getRandomPair(): array
    {
        $firstPokemon = Pokemon::inRandomOrder()->first();
        $secondPokemon = Pokemon::where('id', '!=', $firstPokemon->id)
            ->inRandomOrder()
            ->first();

        return [$firstPokemon, $secondPokemon];
    }

    public function updateRatings(Pokemon $winner, Pokemon $loser): void
    {
        $winner->rating += 10;
        $loser->rating -= 10;
        
        $winner->save();
        $loser->save();
    }
} 