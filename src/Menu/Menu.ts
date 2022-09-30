import MenuBackground from "./MenuBackground";
import Container = Phaser.GameObjects.Container;
import MenuEntry from "./MenuEntry";
import ContinueEntry from "./entries/ContinueEntry";
import Rectangle = Phaser.GameObjects.Rectangle;

export default class Menu extends Container {
    background: MenuBackground;
    continue: MenuEntry;

    constructor(scene, x, y) {
        super(scene);

        this.x = x;
        this.y = y;

        this.background = new MenuBackground(scene);
        this.continue = new ContinueEntry(scene);

        this.add([this.background, this.continue]);

        this.scene.add.existing(this);
    }
}