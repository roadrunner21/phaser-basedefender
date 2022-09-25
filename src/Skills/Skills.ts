export default class Skills {
    attack : number;
    defense : number;
    hitPoints : number;
    currentHitPoints: number;

    constructor(attack = 1, defense = 1, hitPoints = 10) {
        this.attack = attack;
        this.defense = defense;
        this.currentHitPoints = hitPoints;
        this.hitPoints = hitPoints;
    }
}