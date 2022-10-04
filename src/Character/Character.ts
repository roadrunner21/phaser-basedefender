import 'phaser';
import GameScene from "../Scenes/GameScene";
import HealthBar from "./Interface/HealthBar";
import Container = Phaser.GameObjects.Container;
import Sprite = Phaser.Physics.Arcade.Sprite;
import DYNAMIC_BODY = Phaser.Physics.Arcade.DYNAMIC_BODY;
import Body = Phaser.Physics.Arcade.Body;
import Vector2 = Phaser.Math.Vector2;
import Skills from "../Skills/Skills";
import Weapon from "../Item/Weapon/Weapon";
import Fist from "../Item/Weapon/Fist";
import { DOWN, DOWN_LEFT, DOWN_RIGHT, LEFT, RIGHT, UP, UP_LEFT, UP_RIGHT } from '../const';
import AttackAngle from "./Interface/AttackAngle";

export type Direction =
    typeof UP
    | typeof UP_RIGHT
    | typeof RIGHT
    | typeof DOWN_RIGHT
    | typeof DOWN
    | typeof DOWN_LEFT
    | typeof LEFT
    | typeof UP_LEFT

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
    scene: GameScene = null;
    speed = 100;
    spriteScale = 2;
    facing: Direction = DOWN;
    characterSprite: Sprite = null;
    healthBar: HealthBar;
    body: Body;
    direction: Direction = DOWN;
    attackAngle: AttackAngle;
    isMoving : boolean = false;
    isHero = false;
    isEnemy = false;
    private _radius: number;
    private _targets: Character[];
    private _weapon: Weapon;
    private _skills: Skills = new Skills(1, 1);

    constructor(scene: GameScene, x, y, name: string, animations: CharacterAnimationConfig) {
        super(scene, x, y);

        this.scene = scene;
        this.name = name;

        this.characterSprite = this.scene.physics.add.sprite(0, 0, animations.key, animations.facing.down)
        this.characterSprite.scale = this.spriteScale;

        this.healthBar = new HealthBar(this.scene, -10, -16, this.skills.hitPoints, this.skills.currentHitPoints);

        this._weapon = new Fist(this.scene);
        this.addAnimations(animations);

        this.add([this.characterSprite, this.healthBar]);
        this.setSize(this.characterSprite.width * this.spriteScale, this.characterSprite.height * this.spriteScale);

        this.scene.physics.world.enableBody(this, DYNAMIC_BODY);
        this.scene.add.existing(this);

        scene.characters.add(this);

        this.addColliders();
        this.body.friction = new Vector2(0, 0)

        this.body.setCollideWorldBounds(true);

        this.attackAngle = new AttackAngle(this.scene, this.radius, this.body.angle, this.weapon.attackAngle, this.body);
        this.addAt(this.attackAngle, 0);
    }

    addColliders() {
        let otherCharacters = this.scene.characters.getChildren().filter((obj: Character) => obj.id != this.id);

        otherCharacters.forEach((obj: Character) => {
            this.scene.physics.add.collider(this, obj, this.standBy, undefined, this)
        })
    }

    showRadius() {
        let circle = this.scene.add.circle(0, 0, this.radius);
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
            key: `${this.name}_walking_${UP_RIGHT}`,
            frames: this.scene.anims.generateFrameNumbers(animations.key, animations.walking.up_right),
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
            key: `${this.name}_walking_${DOWN_RIGHT}`,
            frames: this.scene.anims.generateFrameNumbers(animations.key, animations.walking.down_right),
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
            key: `${this.name}_walking_${DOWN_LEFT}`,
            frames: this.scene.anims.generateFrameNumbers(animations.key, animations.walking.down_left),
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
            key: `${this.name}_walking_${UP_LEFT}`,
            frames: this.scene.anims.generateFrameNumbers(animations.key, animations.walking.up_left),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: `${this.name}_facing_${UP}`,
            frames: [{ key: animations.key, frame: animations.facing.up }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${UP_RIGHT}`,
            frames: [{ key: animations.key, frame: animations.facing.up_right }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${RIGHT}`,
            frames: [{ key: animations.key, frame: animations.facing.right }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${DOWN_RIGHT}`,
            frames: [{ key: animations.key, frame: animations.facing.down_right }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${DOWN}`,
            frames: [{ key: animations.key, frame: animations.facing.down }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${DOWN_LEFT}`,
            frames: [{ key: animations.key, frame: animations.facing.down_left }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${LEFT}`,
            frames: [{ key: animations.key, frame: animations.facing.left }],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: `${this.name}_facing_${UP_LEFT}`,
            frames: [{ key: animations.key, frame: animations.facing.up_left }],
            frameRate: 20,
        });
    }

    getDirection(): Direction {
        let direction: Direction = DOWN,
            angleDeg = Phaser.Math.RadToDeg(this.body.angle) + 180;

        if (angleDeg.between(157.5, 202.5)) {
            direction = RIGHT;
        } else if (angleDeg.between(202.5, 247.5)) {
            direction = DOWN_RIGHT;
        } else if (angleDeg.between(247.5, 292.5)) {
            direction = DOWN;
        } else if (angleDeg.between(292.5, 337.5)) {
            direction = DOWN_LEFT;
        } else if (angleDeg.between(337.5, 380) || angleDeg.between(0, 22.5)) {
            direction = LEFT;
        } else if (angleDeg.between(22.5, 67.5)) {
            direction = UP_LEFT;
        } else if (angleDeg.between(67.5, 112.5)) {
            direction = UP;
        } else if (angleDeg.between(112.5, 157.5)) {
            direction = UP_RIGHT;
        }

        return direction;
    }

    update(time, delta) {
        // console.log(this.body);
        if(this.isMoving) {
            this.direction = this.getDirection();
            this.facing = this.direction;
            this.characterSprite.anims.play(`${this.name}_walking_${this.direction}`, true);
            this.attackAngle.draw(this.radius, this.body.angle, this.weapon.attackAngle);
        }

    }

    standBy() {
        this.body.setVelocity(0);
        this.characterSprite.anims.play(`${this.name}_facing_${this.facing}`);
        this.isMoving = false;
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

    get radius(): number {
        return this.weapon.radius + (this.width * this.scale / 2);
    }
}