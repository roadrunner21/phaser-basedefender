import 'phaser';
import GameObject = Phaser.GameObjects.GameObject;
import Game from "./Game";
import Layer = Phaser.GameObjects.Layer;
import HealthBar from "./HealthBar";
import Container = Phaser.GameObjects.Container;
import Sprite = Phaser.Physics.Arcade.Sprite;
import DYNAMIC_BODY = Phaser.Physics.Arcade.DYNAMIC_BODY;
import Body = Phaser.Physics.Arcade.Body;

export const UP = 'UP';
export const RIGHT = 'RIGHT';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';

export type Direction = typeof UP | typeof RIGHT | typeof DOWN | typeof LEFT

export type Directions = Array<Direction>;

export type CharacterWalkingFrames = {
    up: Phaser.Types.Animations.GenerateFrameNumbers,
    right: Phaser.Types.Animations.GenerateFrameNumbers,
    down: Phaser.Types.Animations.GenerateFrameNumbers,
    left: Phaser.Types.Animations.GenerateFrameNumbers,
}

export type CharacterFacingFrames = {
    up: number,
    right: number,
    down: number,
    left: number,
}

export type CharacterAnimationConfig = {
    key: string,
    walking: CharacterWalkingFrames,
    facing: CharacterFacingFrames,
}

export default class Character extends Container {
    id: number = Math.round(Math.random() * 1000000000000000);
    scene: Game = null;
    speed = 100;
    spriteScale = 2;
    facing: Direction = DOWN;
    characterSprite: Sprite = null;
    hitBox = { height: 0, width: 0 };
    healthBar: HealthBar;
    body: Body;

    constructor(scene: Game, x, y, name: string, animations: CharacterAnimationConfig) {
        super(scene, x, y);

        this.scene = scene;
        this.name = name;

        this.characterSprite = this.scene.physics.add.sprite(0, 0, animations.key, animations.facing.down)
        this.characterSprite.scale = this.spriteScale;

        this.hitBox.height = this.characterSprite.height * this.spriteScale;
        this.hitBox.width = this.characterSprite.width * this.spriteScale;

        this.addAnimations(animations);

        this.healthBar = new HealthBar(this.scene, -10, -16, this.getMaxHealth(), this.getHealth());

        this.add([this.characterSprite, this.healthBar]);
        this.setSize(this.hitBox.width, this.hitBox.height);

        this.scene.physics.world.enableBody(this, DYNAMIC_BODY);
        this.scene.add.existing(this);

        scene.characters.add(this);

        this.addHitBox();
        this.addColliders();

        this.body.setCollideWorldBounds(true);
    }

    addColliders() {
        let otherCharacters = this.scene.characters.getChildren().filter((obj: Character) => obj.id != this.id);

        otherCharacters.forEach((obj: Character) => {
            this.scene.physics.add.collider(this, obj, this.standBy, undefined, this)
        })
    }

    addHitBox() {
        let rectangle = this.scene.add.rectangle(0, 0, this.width, this.height);
        rectangle.setStrokeStyle(2, 0x1a65ac);

        this.add(rectangle);
    }

    addAnimations(animations) {
        this.scene.anims.create({
            key: `${this.name}_walking_${UP}`,
            frames: this.scene.anims.generateFrameNumbers(animations.key, animations.walking.up),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: `${this.name}_walking_${RIGHT}`,
            frames: this.scene.anims.generateFrameNumbers(animations.key, animations.walking.right),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: `${this.name}_walking_${DOWN}`,
            frames: this.scene.anims.generateFrameNumbers(animations.key, animations.walking.down),
            frameRate: 10,
            repeat: -1,
        });
        this.scene.anims.create({
            key: `${this.name}_walking_${LEFT}`,
            frames: this.scene.anims.generateFrameNumbers(animations.key, animations.walking.left),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: `${this.name}_facing_${UP}`,
            frames: [{ key: animations.key, frame: animations.facing.up }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${RIGHT}`,
            frames: [{ key: animations.key, frame: animations.facing.right }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${DOWN}`,
            frames: [{ key: animations.key, frame: animations.facing.down }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${LEFT}`,
            frames: [{ key: animations.key, frame: animations.facing.left }],
            frameRate: 20,
        });
    }

    move(directions: Directions) {
        let velocityX = 0, velocityY = 0,
            isColliding = false,
            otherChildren = this.scene.characters.getChildren().filter((obj: Character) => obj.id != this.id);

        directions.forEach(direction => {
            switch (direction) {
                case UP:
                    velocityY = -this.speed;
                    break;
                case RIGHT:
                    velocityX = this.speed;
                    break;
                case DOWN:
                    velocityY = this.speed;
                    break;
                case LEFT:
                    velocityX = -this.speed
                    break;
            }
        })

        this.body.setVelocity(velocityX, velocityY)

        this.facing = directions[directions.length - 1];
        this.characterSprite.anims.play(`${this.name}_walking_${directions[directions.length - 1]}`, true);
    }

    standBy() {
        this.body.setVelocity(0);
        this.characterSprite.anims.play(`${this.name}_facing_${this.facing}`)

        return true;
    }

    getHealth() {
        return 100;
    }

    getMaxHealth() {
        return 100;
    }
}