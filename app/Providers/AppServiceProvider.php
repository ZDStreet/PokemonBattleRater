<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use App\View\Components\Layout;
use App\View\Components\Navigation;
use App\View\Components\BattleSection;
use App\View\Components\RankingsSection;
use App\View\Components\PokemonScripts;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Blade::component('layout', Layout::class);
        Blade::component('navigation', Navigation::class);
        Blade::component('battle-section', BattleSection::class);
        Blade::component('rankings-section', RankingsSection::class);
        Blade::component('pokemon-scripts', PokemonScripts::class);
    }
}
