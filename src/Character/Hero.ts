import Game from "../Game";
import Character, { Direction, DOWN, DOWN_LEFT, DOWN_RIGHT, LEFT, RIGHT, UP, UP_LEFT, UP_RIGHT } from "./Character";
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

    constructor(scene: Game, x, y) {
        super(scene, x, y, 'hero', animations);

        this.direction = 'DOWN';
        this.setDepth(100);
        this.body.setImmovable(true);

        this.showRadius();
    }

    update(time, delta) {
        super.update(time, delta);
        this.getEnemiesInRadius();
        this.targets = this.findTargets();
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

        this.body.setVelocity(velocityX, velocityY)
        this.direction = direction;
    }

    findTargets(): Enemy[] {
        let targets = [], closest;

        if (this.getEnemiesInRadius().length > 0) {
            if (this.weapon.aoe) {
                targets = this.getEnemiesInRadius();
            } else {
                closest = this.scene.physics.closest(this.body, this.getEnemiesInRadius());
                if (closest instanceof Enemy) {
                    targets = [closest];
                }
            }
        }

        return targets;
    }

    getEnemiesInRadius(): Enemy[] {
        let enemies = []

        this.scene.physics.overlapCirc(this.body.x, this.body.y, this.radius).forEach(body => {
            if (body.gameObject instanceof Enemy) {
                enemies.push(body.gameObject);
            }
        })
        return enemies;
    }

}