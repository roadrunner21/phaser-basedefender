import 'phaser';
import Hero from "./Character/Hero";
import {
    Direction,
    Directions,
    DOWN,
    DOWN_LEFT,
    DOWN_RIGHT,
    LEFT,
    RIGHT,
    UP,
    UP_LEFT,
    UP_RIGHT
} from "./Character/Character";
import Group = Phaser.GameObjects.Group;
import Layer = Phaser.GameObjects.Layer;
import Ghost from "./Character/Enemies/Ghost";

const GAME_WIDTH = Math.trunc(window.document.documentElement.clientWidth / 16) * 16;
const GAME_HEIGHT = Math.trunc(window.document.documentElement.clientHeight / 16) * 16;

let cursors;

export default class Game extends Phaser.Scene {
    hero: Hero;
    enemies: Group;
    characters: Group;

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
        this.enemies = this.add.group();

        this.characters.runChildUpdate = true;

        new Ghost(this, GAME_WIDTH / 3, GAME_HEIGHT / 3);
        this.hero = new Hero(this, GAME_WIDTH / 2, GAME_HEIGHT / 2);

        this.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT, true, true, true, true)

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
        let direction: Direction;

        if(keyUp && keyRight) {
            direction = UP_RIGHT;
        } else if (keyRight && keyDown) {
            direction = DOWN_RIGHT;
        } else if (keyDown && keyLeft) {
            direction = DOWN_LEFT;
        } else if (keyLeft && keyUp) {
            direction = UP_LEFT;
        } else if (keyUp) {
            direction = UP;
        } else if (keyRight) {
            direction = RIGHT;
        } else if (keyDown) {
            direction = DOWN;
        } else if (keyLeft) {
            direction = LEFT;
        }

        if (!keyUp && !keyRight && !keyDown && !keyLeft) {
            this.hero.standBy();
        } else {
            this.hero.move(direction);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#6DAA2B',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: Game
};

const game = new Phaser.Game(config);
