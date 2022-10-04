import GameScene from "../Scenes/GameScene";
import Character, { Direction } from "./Character";
import {DOWN, DOWN_LEFT, DOWN_RIGHT, LEFT, RIGHT, UP, UP_LEFT, UP_RIGHT} from "../const"
import Enemy from "./Enemy";

let animations = {
    key: 'characters',
    walking: {
        up: { start: 36, end: 38 },
        up_right: { start: 24, end: 26 },
        right: { start: 24, end: 26 },
        down_right: { start: 24, end: 26 },
        down: { start: 0, end: 2 },
        down_left: { start: 12, end: 14 },
        left: { start: 12, end: 14 },
        up_left: { start: 12, end: 14 },
    },
    facing: {
        up: 37,
        up_right: 25,
        right: 25,
        down_right: 25,
        down: 1,
        down_left: 13,
        left: 13,
        up_left: 13,
    }
};

export default class Hero extends Character {

    constructor(scene: GameScene, x, y) {
        super(scene, x, y, 'hero', animations);

        this.direction = 'DOWN';
        this.setDepth(100);
        this.body.setImmovable(true);
        this.isHero = true;
    }

    update(time, delta) {
        super.update(time, delta);
        this.targets = this.findTargets();
        if(this.targets.length && this.lastAttack + this.weapon.speed <= time) {
            this.attack();
            this.lastAttack = time;
        }
    }

    attack() {
        this.targets.forEach(target => {
            target.reduceHitPoints(this.attackPower);
        })
    }

    move(direction: Direction) {
        let velocityX = 0, velocityY = 0;

        switch (direction) {
            case UP:
                velocityY = -this.speed;
                break;
            case UP_RIGHT:
                velocityX = this.speed;
                velocityY = -this.speed;
                break;
            case RIGHT:
                velocityX = this.speed;
                break;
            case DOWN_RIGHT:
                velocityX = this.speed;
                velocityY = this.speed;
                break;
            case DOWN:
                velocityY = this.speed;
                break;
            case DOWN_LEFT:
                velocityX = -this.speed;
                velocityY = this.speed;
                break;
            case LEFT:
                velocityX = -this.speed;
                break;
            case UP_LEFT:
                velocityX = -this.speed;
                velocityY = -this.speed;
                break;
        }

        this.isMoving = true;
        this.body.setVelocity(velocityX, velocityY);
    }

    findTargets(): Enemy[] {
        let targets : Enemy[] = [], enemiesInRadius = this.getEnemiesInRadius(), closest;

        if (enemiesInRadius.length > 0) {
            if (this.weapon.aoe) {
                targets = enemiesInRadius;
            } else {
                closest = this.scene.physics.closest(this.body, enemiesInRadius);
                if (closest.isEnemy) {
                    targets = [closest];
                }
            }
        }

        return targets;
    }

    getEnemiesInRadius(): Enemy[] {
        return this.attackAngle.overlap(this.body);
    }

}