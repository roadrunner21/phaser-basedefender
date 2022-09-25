import Character, {
    CharacterAnimationConfig, Direction, DOWN, DOWN_LEFT, DOWN_RIGHT, LEFT, RIGHT, UP, UP_LEFT, UP_RIGHT,
} from "./Character";
import Game from "../Game";

export default class Enemy extends Character {
    constructor(scene: Game, x, y, name, animations : CharacterAnimationConfig) {
        super(scene, x, y, name, animations);

        this.scene.enemies.add(this);
    }

    update(time, delta) {
        this.direction = this.getDirection();
        this.facing = this.getDirection();
        super.update(time, delta);
        this.scene.physics.moveToObject(this, this.scene.hero);
    }

    getDirection() : Direction {
        let direction : Direction,
            {x, y} = this.body.velocity

        if(x > 0) {
            if(y > 0) {
                if(x / y > 2) {
                    direction = RIGHT;
                } else if(x/y < 0.75) {
                    direction = DOWN;
                } else {
                    direction = DOWN_RIGHT;
                }
            } else {
                if(x / y) {
                    if(x / y < -2) {
                        direction = RIGHT;
                    } else if(x/y > -0.75) {
                        direction = UP;
                    } else {
                        direction = UP_RIGHT;
                    }
                }
            }
        } else {
            if(y > 0) {
                if(x / y < -2) {
                    direction = LEFT;
                } else if(x/y > -0.75) {
                    direction = DOWN;
                } else {
                    direction = DOWN_LEFT;
                }
            } else {
                if(x / y) {
                    if(x / y > 2) {
                        direction = LEFT;
                    } else if(x/y < 0.75) {
                        direction = UP;
                    } else {
                        direction = UP_LEFT;
                    }
                }
            }
        }

        return direction;
    }

}