import GameObject = Phaser.GameObjects.GameObject;
import GameScene from "../Scenes/GameScene";

export default class Item extends GameObject {

    constructor(scene: GameScene) {
        super(scene, 'sprite');
    }
}