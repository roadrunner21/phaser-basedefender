import GameScene from "../../Scenes/GameScene";
import Item from "../Item";

export default class Weapon extends Item {
    attack: number;
    radius: number;
    speed: number;
    aoe: boolean;

    constructor(scene: GameScene) {
        super(scene);
    }
}