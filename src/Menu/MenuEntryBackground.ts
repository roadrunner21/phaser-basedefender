import { Scene } from "phaser";
import Graphics = Phaser.GameObjects.Graphics;

export default class MenuEntryBackground extends Graphics {
    width: number;
    height: number;
    padding: number;
    x: number;
    y: number;

    constructor(scene : Scene, width, height, padding) {
        super(scene);

        this.padding = padding;
        this.x = -padding/2;
        this.y = -padding/2;
        this.width = width + (padding * 2);
        this.height = height + (padding * 2);

        this.draw();
    }

    draw() {
        this.fillStyle(0xAFAFAF);
        this.fillRect(this.x, this.y, this.width, this.height);
    }

}