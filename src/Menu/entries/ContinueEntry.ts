import MenuEntry from "../MenuEntry";

export default class ContinueEntry extends MenuEntry {
    constructor(scene : Phaser.Scene) {
        super(scene, 0, 0, 'Continue');
        this.scene = scene;
    }

    onClick() {
        super.onClick();

        this.scene.scene.setVisible(false);
        this.scene.scene.resume('gameScene');
    }
}