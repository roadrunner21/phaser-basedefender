import GameScene from "../../Scenes/GameScene";
import Item from "../Item";

export default class Weapon extends Item {
    attack: number;
    radius: number;
    speed: number;
    aoe: boolean;
    private _attackAngle: number; // rad

    constructor(scene: GameScene) {
        super(scene);
    }

    get attackAngle(): number {
        return this._attackAngle;
    }

    set attackAngle(value: number) {
        this._attackAngle = Phaser.Math.DegToRad(value);
    }
}