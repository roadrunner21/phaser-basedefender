import Container = Phaser.GameObjects.Container;
import GameScene from "../../Scenes/GameScene";
import experienceLevels from "../../config/experienceLevels";
import Graphics = Phaser.GameObjects.Graphics;
import Rectangle = Phaser.GameObjects.Rectangle;
import { GAME_HEIGHT, GAME_WIDTH } from "../../const";
import Experience from "../Experience/Experience";
import Point = Phaser.Geom.Point;

export default class ExperienceBar extends Container {
    border;
    background;
    experienceText : Phaser.GameObjects.Text;
    experience;
    x;
    y;

    constructor(scene: GameScene, experience, maxExperience) {
        super(scene);

        this.experience = experience;
        this.x = GAME_WIDTH / 2;
        this.y = 50;

        this.border = new Rectangle(scene, 0, 0, 400, 20);
        this.border.setStrokeStyle(1, 0x000000);

        this.background = new Rectangle(scene,
            this.backgroundPosition.x, this.backgroundPosition.y,
            this.backgroundWidth, 18,
            0x00FF00);

        this.experienceText = new Phaser.GameObjects.Text(this.scene, 0, 0,
            this.text,
            { font: '14px Arial', color: '#000000' })
        this.experienceText.x -= this.experienceText.width / 2
        this.experienceText.y -= this.experienceText.height / 2

        this.add([this.border, this.background, this.experienceText]);
    }

    draw(experience: number) {
        this.experience = experience;
        this.background.width = this.backgroundWidth;
        this.experienceText.setText(this.text);
        // this.experienceText.x -= this.experienceText.width / 2
        // this.experienceText.y -= this.experienceText.height / 2
        this.experienceText.updateText();
    }

    get level(): number {
        return Experience.getLevel(this.experience);
    }

    get text(): string {
        return `${this.experience}/${this.experienceNextLevel}`;
    }

    get experienceNextLevel(): number {
        return Experience.getRequiredExperience(this.level + 1);
    }

    get backgroundWidth(): number {
        return (this.border.width - this.border.lineWidth) / 100 * 100 * this.experience / this.experienceNextLevel
    }

    get backgroundPosition(): Point {
        return new Point(-(this.border.width - this.border.lineWidth - this.backgroundWidth) / 2, 0)
    }
}