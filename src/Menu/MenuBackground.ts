import Graphics = Phaser.GameObjects.Graphics;

export default class MenuBackground extends Graphics {
    width: number = 150;
    height: number = 300;

    constructor(scene) {
        super(scene);

        this.x = 0;
        this.y = 0;

        this.draw();
    }

    draw() {
        // this.fillStyle(0x0000FF); // blue
        // this.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}