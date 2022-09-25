import Character, {
    CharacterAnimationConfig,
} from "./Character";
import Game from "../Game";

export default class Enemy extends Character {
    constructor(scene: Game, x, y, name, animations : CharacterAnimationConfig) {
        super(scene, x, y, name, animations);

        this.scene.enemies.add(this);
    }

    update(time, delta) {
        this.scene.physics.moveToObject(this, this.scene.hero);
    }


}