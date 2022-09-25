import Game from "../../Game";
import Item from "../Item";

export default class Weapon extends Item {
    attack: number;
    radius: number;
    speed: number;
    aoe: boolean;

    constructor(scene: Game) {
        super(scene);
    }
}