import Enemy from "../Enemy";
import Loot from "../Loot/Loot";

export default class Ghost extends Enemy {
    constructor(scene, x, y) {
        let animation = {
            key: 'characters',
            walking: {
                up: { start: 90, end: 92 },
                up_right: { start: 78, end: 80 },
                right: { start: 78, end: 80 },
                down_right: { start: 78, end: 80 },
                down: { start: 54, end: 56 },
                down_left: { start: 66, end: 68 },
                left: { start: 66, end: 68 },
                up_left: { start: 66, end: 68 },
            },
            facing: {
                up: 91,
                up_right: 79,
                right: 79,
                down_right: 79,
                down: 55,
                down_left: 67,
                left: 67,
                up_left: 67,
            }
        };

        super(scene, x, y, 'ghost', animation);

        this.loot = new Loot(50,1)
    }
}