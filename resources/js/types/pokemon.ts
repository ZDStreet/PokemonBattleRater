export interface Pokemon {
    id: number;
    name: string;
    sprite_url: string;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
    rating: number;
}

export interface VoteInfo {
    loserId: string;
    winnerCard: HTMLElement;
} 