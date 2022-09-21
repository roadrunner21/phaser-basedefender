import Character, {
    CharacterAnimationConfig,
} from "./Character";
import Game from "./Game";

export default class Hero extends Character {
    constructor(scene: Game, type, x, y, animations : CharacterAnimationConfig) {
        super(scene, type, x, y, 'hero', animations);

        this.layer.setDepth(100);
    }


}