import 'phaser';
import Game from "../Game";
import HealthBar from "./Interface/HealthBar";
import Container = Phaser.GameObjects.Container;
import Sprite = Phaser.Physics.Arcade.Sprite;
import DYNAMIC_BODY = Phaser.Physics.Arcade.DYNAMIC_BODY;
import Body = Phaser.Physics.Arcade.Body;
import Vector2 = Phaser.Math.Vector2;
import Skills from "../Skills/Skills";
import Weapon from "../Item/Weapon/Weapon";
import Fist from "../Item/Weapon/Fist";
import Hero from "./Hero";
import Graphics = Phaser.GameObjects.Graphics;

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
    private _targets : Character[];
    private _weapon: Weapon;
    private _skills: Skills = new Skills(1,1);

    constructor(scene: Game, x, y, name: string, animations: CharacterAnimationConfig) {
        super(scene, x, y);

        this.scene = scene;
        this.name = name;

        this.characterSprite = this.scene.physics.add.sprite(0, 0, animations.key, animations.facing.down)
        this.characterSprite.scale = this.spriteScale;

        this.hitBox.height = this.characterSprite.height * this.spriteScale;
        this.hitBox.width = this.characterSprite.width * this.spriteScale;

        this.healthBar = new HealthBar(this.scene, -10, -16, this.skills.hitPoints, this.skills.currentHitPoints);

        this._weapon = new Fist(this.scene);
        this.addAnimations(animations);

        this.add([this.characterSprite, this.healthBar]);
        this.setSize(this.hitBox.width, this.hitBox.height);

        this.scene.physics.world.enableBody(this, DYNAMIC_BODY);
        this.scene.add.existing(this);

        scene.characters.add(this);

        this.addColliders();
        this.body.friction = new Vector2(0,0)

        this.body.setCollideWorldBounds(true);
    }

    addColliders() {
        let otherCharacters = this.scene.characters.getChildren().filter((obj: Character) => obj.id != this.id);

        otherCharacters.forEach((obj: Character) => {
            this.scene.physics.add.collider(this, obj, this.standBy, undefined, this)
        })
    }

    showRadius() {
        let circle = this.scene.add.circle(0, 0, this.weapon.radius);
        circle.setFillStyle(0x1a65ac, 0.8);
        this.addAt(circle, 0);
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
    }

    get skills(): Skills {
        return this._skills;
    }

    set skills(value: Skills) {
        this._skills = value;
    }

    get weapon(): Weapon {
        return this._weapon;
    }

    set weapon(value: Weapon) {
        this._weapon = value;
    }

    get targets(): Character[] {
        return this._targets;
    }

    set targets(characters: Character[]) {
        this._targets = characters;
    }
}