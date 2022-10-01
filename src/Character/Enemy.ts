import Character, { CharacterAnimationConfig, Direction, } from "./Character";
import { DOWN, DOWN_LEFT, DOWN_RIGHT, LEFT, RIGHT, UP, UP_LEFT, UP_RIGHT } from "../const"
import GameScene from "../Scenes/GameScene";
import Hero from "./Hero";

export default class Enemy extends Character {
    constructor(scene: GameScene, x, y, name, animations: CharacterAnimationConfig) {
        super(scene, x, y, name, animations);

        this.scene.enemies.add(this);
    }

    update(time, delta) {
        let minDistance = (this.scene.hero.width * this.scene.hero.scale / 2) + this.weapon.radius - 1;

        super.update(time, delta);

        let isHeroInRange = this.isHeroInRange();

        if (Phaser.Math.Distance.BetweenPoints(this, this.scene.hero) > minDistance) {
            this.direction = this.getDirection();
            this.facing = this.getDirection();
            this.scene.physics.moveToObject(this, this.scene.hero);
        } else {
            this.standBy();
        }
    }

    isHeroInRange() {
        let isHeroInRange = false;

        this.scene.physics.overlapCirc(this.body.x, this.body.y, this.radius).forEach(body => {
            if (body.gameObject instanceof Hero) {
                isHeroInRange = true;
            }
        })

        return isHeroInRange;
    }

    getDirection(): Direction {
        let direction: Direction = DOWN,
            { x, y } = this.body.velocity,
            angleDeg = Phaser.Math.RadToDeg(this.body.angle) + 180;


        if (angleDeg.between(157.5, 202.5)) {
            direction = RIGHT;
        } else if (angleDeg.between(202.5, 247.5)) {
            direction = DOWN_RIGHT;
        } else if (angleDeg.between(247.5, 292.5)) {
            direction = DOWN;
        } else if (angleDeg.between(292.5, 337.5)) {
            direction = DOWN_LEFT;
        } else if (angleDeg.between(337.5, 380) || angleDeg.between(0, 22.5)) {
            direction = LEFT;
        } else if (angleDeg.between(22.5, 67.5)) {
            direction = UP_LEFT;
        } else if (angleDeg.between(67.5, 112.5)) {
            direction = UP;
        } else if (angleDeg.between(112.5, 157.5)) {
            direction = UP_RIGHT;
        }

        return direction;
    }

}