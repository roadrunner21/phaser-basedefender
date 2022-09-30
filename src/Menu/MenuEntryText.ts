import { Scene } from "phaser";
import Text = Phaser.GameObjects.Text;
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;

export default class MenuEntryText extends Text {
    constructor(scene : Scene, x, y, text) {
        super(scene, x, y, text, { font: '24px Arial', color: '#fff' });
    }

}