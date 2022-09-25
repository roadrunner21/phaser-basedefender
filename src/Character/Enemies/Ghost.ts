import Enemy from "../Enemy";

export default class Ghost extends Enemy {
    constructor(scene, x, y) {
        let animation = {
            key: 'characters',
            walking: {
                up: { start: 90, end: 92 },
                right: { start: 78, end: 80 },
                down: { start: 54, end: 56 },
                left: { start: 66, end: 68 },
            },
            facing: {
                up: 91,
                right: 79,
                down: 55,
                left: 67,
            }
        };

        super(scene, x, y, 'ghost', animation);
    }
}