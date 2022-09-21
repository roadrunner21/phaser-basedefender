import 'phaser';
import Hero from "./Hero";
import RandomDataGenerator = Phaser.Math.RandomDataGenerator;
import { DOWN, LEFT, RIGHT, UP } from "./Character";
import Enemy from "./Enemy";
import Group = Phaser.GameObjects.Group;
import Layer = Phaser.GameObjects.Layer;

const GAME_WIDTH = Math.trunc(window.document.documentElement.clientWidth / 16) * 16;
const GAME_HEIGHT = Math.trunc(window.document.documentElement.clientHeight / 16) * 16;


let cursors;

export default class Game extends Phaser.Scene {
    hero;
    enemy;
    characters : Group;

    preload() {
        this.load.spritesheet('basictiles', 'assets/basictiles.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('characters', 'assets/characters.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        let currentTile = 0, layer: Layer;

        for (let i = 0; i < GAME_WIDTH / 16; i++) {
            for (let j = 0; j < GAME_HEIGHT / 16; j++) {
                let frameObjGrass = 20;
                let frameTileGrass = 64;
                let frameFlowers = 12;

                if ((i * j) % 30 == 21 || (i * j) % 26 == 3) {
                    let frame = frameTileGrass;
                    if ((i + j) % 6 === 2) {
                        frame = frameObjGrass;
                    } else if ((i + j) % 6 === 4) {
                        frame = frameFlowers;
                    }
                    let spriteY = this.add.image((i * 32) + 8, (j * 32) + 8, 'basictiles', frame);
                    spriteY.scale = 1;
                }
                currentTile++;
            }
            currentTile++;
        }

        this.characters = this.add.group();

        this.hero = new Hero(this, 'sprite', GAME_WIDTH / 2, GAME_HEIGHT / 2, {
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
        });

        this.enemy = new Enemy(this, 'sprite', GAME_WIDTH / 3, GAME_HEIGHT / 2, 'ghost', {
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
        });

        layer = new Layer(this, [this.hero, this.enemy]);
        layer.bringToTop(this.hero);

        cursors = this.input.keyboard.createCursorKeys();
        cursors = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

    }

    update(time, delta) {
        const keyUp = cursors.up.isDown;
        const keyRight = cursors.right.isDown;
        const keyDown = cursors.down.isDown;
        const keyLeft = cursors.left.isDown;

        if (keyUp) {
            this.hero.move(UP);
        }
        if (keyRight) {
            this.hero.move(RIGHT);
        }
        if (keyDown) {
            this.hero.move(DOWN);
        }
        if (keyLeft) {
            this.hero.move(LEFT);
        }
        if(!keyUp && !keyRight && !keyDown && !keyLeft) {
            this.hero.standBy();
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#6DAA2B',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scene: Game
};

const game = new Phaser.Game(config);
