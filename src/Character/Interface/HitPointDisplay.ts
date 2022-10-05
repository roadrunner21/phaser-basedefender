import Container = Phaser.GameObjects.Container;
import { Scene } from "phaser";
import Text = Phaser.GameObjects.Text;

export default class HitPointDisplay extends Container {
    scene: Scene;

    constructor(scene: Scene) {
        super(scene);

        this.scene = scene;
    }

    addDamageDisplay(value: number) {
        let tween, text = new Text(this.scene, 0, 0, value.toString(), { font: '16px Arial', color: '#FF0000' })
        text.x -= text.width / 2
        text.y -= text.height / 2

        tween = this.scene.tweens.add({
            targets: text,
            y: -50,
            alpha: 0,
            paused: false,
            duration: 1000,
            onComplete: function() {
                text.destroy();
            }
        })

        this.add(text);
    }
}