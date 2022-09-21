import 'phaser';
import GameObject = Phaser.GameObjects.GameObject;
import { Scene } from "phaser";
import GenerateFrameNumbers = Phaser.Types.Animations.GenerateFrameNumbers;
import Game from "./Game";
import Layer = Phaser.GameObjects.Layer;

export const UP = 'UP';
export const RIGHT = 'RIGHT';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';

export type Direction = typeof UP | typeof RIGHT | typeof DOWN | typeof LEFT

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

export default class Character extends GameObject {
    id: number = Math.round(Math.random() * 1000000000000000);
    scene : Game = null;
    speed = 100;
    scale = 2;
    entityPosition;
    group: Phaser.GameObjects.Group = null;
    facing: Direction = DOWN;
    characterSprite = null;
    hitBox = {height: 0, width: 0};
    layer: Layer;

    constructor(scene: Game, type, x, y, name : string, animations : CharacterAnimationConfig) {
        super(scene, type);

        this.entityPosition = new Phaser.Geom.Point(x, y);
        this.group = scene.add.group();

        this.scene = scene;

        this.characterSprite = this.scene.add.sprite(x, y, animations.key, animations.facing.down)
        this.characterSprite.scale = this.scale;

        this.hitBox.height = this.characterSprite.height * this.scale;
        this.hitBox.width = this.characterSprite.width * this.scale;

        this.group.add(this.characterSprite);
        this.name = name;

        this.layer = this.scene.add.layer(this.characterSprite)

        this.addAnimations(animations);
        scene.characters.add(this);
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
            frames: [ { key: animations.key, frame: animations.facing.up } ],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${RIGHT}`,
            frames: [ { key: animations.key, frame: animations.facing.right } ],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${DOWN}`,
            frames: [ { key: animations.key, frame: animations.facing.down } ],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${LEFT}`,
            frames: [ { key: animations.key, frame: animations.facing.left } ],
            frameRate: 20,
        });
    }

    move(direction: Direction) {
        let newPositionX = this.entityPosition.x,
            newPositionY = this.entityPosition.y,
            isColliding = false,
            otherChildren = this.scene.characters.getChildren().filter((obj : Character) => obj.id != this.id);
        switch (direction) {
            case UP:
                newPositionY = this.entityPosition.y - .01 * this.speed;
                break;
            case RIGHT:
                newPositionX = this.entityPosition.x + .01 * this.speed;
                break;
            case DOWN:
                newPositionY = this.entityPosition.y + .01 * this.speed;
                break;
            case LEFT:
                newPositionX = this.entityPosition.x - .01 * this.speed;
                break;
        }

        // collision check
        otherChildren.forEach((obj : Character) => {
            let isCollidingX, isCollidingY;

            if(obj.entityPosition.x - obj.hitBox.height / 2 <= newPositionX &&
                obj.entityPosition.x + obj.hitBox.height / 2 >= newPositionX) {
                isCollidingX = true;
            }

            if(obj.entityPosition.y - obj.hitBox.width / 2 <= newPositionY &&
                obj.entityPosition.y + obj.hitBox.width / 2 >= newPositionY) {
                isCollidingY = true;
            }

            isColliding = isColliding || (isCollidingX && isCollidingY);
        })

        if(!isColliding) {
            this.entityPosition.x = newPositionX;
            this.entityPosition.y = newPositionY;
        }

        this.facing = direction;
        Phaser.Actions.ShiftPosition(this.group.getChildren(), this.entityPosition.x, this.entityPosition.y);
        this.characterSprite.anims.play(`${this.name}_walking_${direction}`, true);
    }

    standBy() {
        this.characterSprite.anims.play(`${this.name}_facing_${this.facing}`)
    }
}