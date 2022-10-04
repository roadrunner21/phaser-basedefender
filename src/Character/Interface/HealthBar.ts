import Graphics = Phaser.GameObjects.Graphics;

export default class HitPointsBar extends Graphics {
    x: number;
    y: number;
    maxHitPoints: number;
    hitPoints: number;

    constructor (scene, x, y, maxHitPoints, hitPoints)
    {
        super(scene);

        this.x = x;
        this.y = y;
        this.maxHitPoints = maxHitPoints;
        this.hitPoints = hitPoints;

        this.draw();
    }

    setHitPoints (amount)
    {
        this.hitPoints = amount;

        this.draw();
    }

    draw ()
    {
        let width = 36,
            height = 4,
            border = 4,
            hitPointsWidthPercentage = 100 / (this.maxHitPoints / this.hitPoints);

        this.clear();

        //  BG
        this.fillStyle(0x000000);
        this.fillRect(this.x, this.y, width + border, height + border);

        //  HitPoints
        this.fillStyle(0xffffff);
        this.fillRect(this.x + 2, this.y + 2, width, height);

        if (hitPointsWidthPercentage < 30)
        {
            this.fillStyle(0xff0000);
        }
        else
        {
            this.fillStyle(0x00ff00);
        }

        this.fillRect(this.x + 2, this.y + 2, width * hitPointsWidthPercentage / 100, 4);
    }

}