<?php

namespace App\Repositories;

use App\Models\Pokemon;
use Illuminate\Database\Eloquent\Collection;

class PokemonRepository
{
    public function findByName(string $name): ?Pokemon
    {
        return Pokemon::where('name', $name)->first();
    }

    public function create(array $data): Pokemon
    {
        return Pokemon::create($data);
    }

    public function getRandomPair(): array
    {
        $first = Pokemon::inRandomOrder()->first();
        $second = Pokemon::where('id', '!=', $first->id)
            ->inRandomOrder()
            ->first();

        return [$first, $second];
    }

    public function getAllOrderedByRating(): Collection
    {
        return Pokemon::orderBy('rating', 'desc')->get();
    }
} 