import Graphics = Phaser.GameObjects.Graphics;
import GameScene from "../../Scenes/GameScene";
import Body = Phaser.Physics.Arcade.Body;
import Line = Phaser.Geom.Line;
import Point = Phaser.Geom.Point;
import Rectangle = Phaser.Geom.Rectangle;
import Polygon = Phaser.Geom.Polygon;
import Enemy from "../Enemy";

export default class AttackAngle extends Graphics {
    x: number;
    y: number;
    radius: number;
    angle: number; // rad
    attackAngle: number; // rad
    scene: GameScene;
    characterId: number;
    body: Body;
    polygon: Polygon;

    constructor(scene: GameScene, radius, angle, attackAngle, body) {
        super(scene);

        this.radius = radius;
        this.angle = angle;
        this.scene = scene;
        this.body = body;

        this.draw(radius, angle, attackAngle);
    }

    draw(radius, angle, attackAngle) {
        let angles = [], polygonPoints;
        this.clear();

        angles = [
            angle - attackAngle / 2,
            angle - attackAngle / 2.1,
            angle - attackAngle / 2.5,
            angle - attackAngle / 3,
            angle - attackAngle / 4,
            angle - attackAngle / 8,
            angle - attackAngle / 16,
            angle + attackAngle / 16,
            angle + attackAngle / 8,
            angle + attackAngle / 4,
            angle + attackAngle / 3,
            angle + attackAngle / 2.5,
            angle + attackAngle / 2.1,
            angle + attackAngle / 2,
        ]

        polygonPoints = angles.map((angle) => {
            return new Point(radius * Math.cos(angle), radius * Math.sin(angle))
        })

        // this.fillStyle(0x6666ff, 0.5);
        // this.beginPath();
        // this.moveTo(0, 0);
        // this.arc(0, 0, radius,
        //     angle - attackAngle / 2, angle + attackAngle / 2);
        // this.closePath();
        // this.fillPath();

        this.polygon = new Polygon([
            new Point(0,0),
            ...polygonPoints
        ])

        this.lineStyle(2, 0x66FFFF, 0.5);
        this.beginPath();
        this.moveTo(this.polygon.points[0].x, this.polygon.points[0].y);

        for (let i = 1; i < this.polygon.points.length; i++) {
            this.lineTo(this.polygon.points[i].x, this.polygon.points[i].y);
        }

        this.closePath();
        this.strokePath();
    }

    overlap(body) {
        let enemiesInCircle = [], enemies = [];

        this.scene.physics.overlapCirc(this.body.x, this.body.y, this.radius).forEach(body => {
            if (body.gameObject.isEnemy) {
                enemiesInCircle.push(body.gameObject);
            }
        })

        enemiesInCircle.forEach((enemy: Enemy) => {
            let rect: Rectangle;
            rect = new Rectangle(enemy.body.x - (enemy.body.width / 2), enemy.body.y - (enemy.body.height / 2), enemy.body.width, enemy.body.height)
            Polygon.GetPoints(this.polygon, 100).every((point: Phaser.Geom.Point) => {
                if (rect.contains(body.x + point.x, body.y + point.y)) {
                    enemies.push(enemy);
                    return false;
                }
                return true;
            })
        })

        return enemies;
    }
}