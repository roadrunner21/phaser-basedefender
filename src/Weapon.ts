import GameObject = Phaser.GameObjects.GameObject;
import Game from "./Game";

class Weapon extends GameObject {
    attack: number;

    constructor(scene: Game, type: string) {
        super(scene, type);
    }
}