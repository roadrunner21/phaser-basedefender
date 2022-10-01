import Graphics = Phaser.GameObjects.Graphics;

export default class AttackAngle extends Graphics {
    x: number;
    y: number;
    radius: number;
    angle: number; // rad
    attackAngle: number; // rad

    constructor(scene, radius, angle, attackAngle) {
        super(scene);

        this.radius = radius;
        this.angle = angle;


        this.draw(radius, angle, attackAngle);
    }

    draw(radius, angle, attackAngle) {
        this.clear();

        let startAngle, endAngle;

        startAngle = angle - attackAngle/2;
        endAngle = angle + attackAngle/2;

        // this.fillStyle(0x6666ff);
        // this.fillTriangle(0, 0,
        //     radius * Math.cos(angle), radius * Math.sin(angle),
        //     radius * Math.sin(angle), radius * -Math.cos(angle))


        this.fillStyle(0x6666ff, 0.5);

        // this.beginPath();
        // this.moveTo(0, 0);
        // this.arc(radius * Math.cos(angle), radius * Math.sin(angle), radius,
        //     Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45));
        // this.closePath();



        this.beginPath();
        this.moveTo(0, 0);
        this.arc(0, 0, radius,
            startAngle, endAngle);
        this.closePath();

        this.fillPath();

    }
}