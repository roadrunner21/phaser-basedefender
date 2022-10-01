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
            this.facing = this.getDirection();
            this.isMoving = true;
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



}