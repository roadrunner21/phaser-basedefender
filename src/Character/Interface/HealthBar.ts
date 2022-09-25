import Graphics = Phaser.GameObjects.Graphics;

export default class HealthBar extends Graphics {
    x: number;
    y: number;
    maxHealth: number;
    health: number;

    constructor (scene, x, y, maxHealth, health)
    {
        super(scene);

        this.x = x;
        this.y = y;
        this.maxHealth = maxHealth;
        this.health = health;

        this.draw();
    }

    setHealth (amount)
    {
        this.health = amount;

        this.draw();
    }

    draw ()
    {
        let width = 36,
            height = 4,
            border = 4,
            healthWidthPercentage = 100 / (this.maxHealth / this.health);

        this.clear();

        //  BG
        this.fillStyle(0x000000);
        this.fillRect(this.x, this.y, width + border, height + border);

        //  Health
        this.fillStyle(0xffffff);
        this.fillRect(this.x + 2, this.y + 2, width, height);

        if (healthWidthPercentage < 30)
        {
            this.fillStyle(0xff0000);
        }
        else
        {
            this.fillStyle(0x00ff00);
        }

        this.fillRect(this.x + 2, this.y + 2, width * healthWidthPercentage / 100, 4);
    }

}