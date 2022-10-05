import Character, { CharacterAnimationConfig } from "./Character";
import GameScene from "../Scenes/GameScene";
import Hero from "./Hero";

export default class Enemy extends Character {
    constructor(scene: GameScene, x, y, name, animations: CharacterAnimationConfig) {
        super(scene, x, y, name, animations);

        this.scene.enemies.add(this);
        this.isEnemy = true;
    }

    update(time, delta) {
        let minDistance = (this.scene.hero.width * this.scene.hero.scale / 2) + this.weapon.radius - 1;

        if(!super.update(time, delta)) {
            return false;
        }
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
            if (body.gameObject.isHero) {
                isHeroInRange = true;
            }
        })

        return isHeroInRange;
    }



}