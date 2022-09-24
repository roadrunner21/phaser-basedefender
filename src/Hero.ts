import Game from "./Game";
import Character from "./Character";

export default class Hero extends Character {
    constructor(scene: Game, x, y) {
        let animations = {
            key: 'characters',
            walking: {
                up: { start: 36, end: 38 },
                right: { start: 24, end: 26 },
                down: { start: 0, end: 2 },
                left: { start: 12, end: 14 },
            },
            facing: {
                up: 37,
                right: 25,
                down: 1,
                left: 13,
            }
        };

        super(scene, x, y, 'hero', animations);
        this.setDepth(100);
        this.body.setImmovable(true);
    }


}