import { Scene } from "phaser";
import MenuEntryText from "./MenuEntryText";
import Container = Phaser.GameObjects.Container;
import MenuEntryBackground from "./MenuEntryBackground";

export default class MenuEntry extends Container {
    text: MenuEntryText;
    background: MenuEntryBackground;
    padding: number = 10;

    constructor(scene: Scene, x, y, text) {
        super(scene, x, y);

        this.text = new MenuEntryText(scene, x, y, text)
        this.background = new MenuEntryBackground(scene, this.text.width, this.text.height, this.padding);

        this.add([this.background, this.text]);

        this.setInteractive({
                useHandCursor: true,
                hitArea: new Phaser.Geom.Rectangle(-this.padding, -this.padding, this.background.width, this.background.height),
                hitAreaCallback: Phaser.Geom.Rectangle.Contains
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
                this.onClick.bind(this))

    }

    onClick() {
    }

}