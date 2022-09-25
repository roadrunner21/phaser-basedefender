import GameObject = Phaser.GameObjects.GameObject;
import Game from "../Game";

export default class Item extends GameObject {

    constructor(scene: Game) {
        super(scene, 'sprite');
    }
}