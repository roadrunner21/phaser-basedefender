import Character, {
    CharacterAnimationConfig,
} from "./Character";
import Game from "./Game";

export default class Enemy extends Character {
    constructor(scene: Game, type, x, y, name, animations : CharacterAnimationConfig) {
        super(scene, type, x, y, name, animations);
    }


}