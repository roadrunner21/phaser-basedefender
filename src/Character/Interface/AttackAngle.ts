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
        this.clear();

        let startAngle, endAngle, centerAngle, angle2, angle3;

        startAngle = angle - attackAngle / 2;
        angle2 = angle - attackAngle / 4;
        angle3 = angle + attackAngle / 4;
        endAngle = angle + attackAngle / 2;

        this.fillStyle(0x6666ff, 0.5);
        this.beginPath();
        this.moveTo(0, 0);
        this.arc(0, 0, radius,
            startAngle, endAngle);
        this.closePath();
        this.fillPath();

        this.polygon = new Polygon([
            0, 0,
            radius * Math.cos(startAngle), radius * Math.sin(startAngle),
            radius * Math.cos(angle2), radius * Math.sin(angle2),
            radius * Math.cos(angle), radius * Math.sin(angle),
            radius * Math.cos(angle3), radius * Math.sin(angle3),
            radius * Math.cos(endAngle), radius * Math.sin(endAngle)
        ])

        this.lineStyle(2, 0x66FFFF);
        this.beginPath();
        this.moveTo(this.polygon.points[0].x, this.polygon.points[0].y);

        for (let i = 1; i < this.polygon.points.length; i++)
        {
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

        enemiesInCircle.forEach((enemy : Enemy) => {
            let rect : Rectangle;
            rect = new Rectangle(enemy.body.x - (enemy.body.width / 2), enemy.body.y - (enemy.body.height / 2), enemy.body.width, enemy.body.height)
            Polygon.GetPoints(this.polygon, 100).every((point : Phaser.Geom.Point) => {
                if(rect.contains(body.x + point.x, body.y + point.y)) {
                    enemies.push(enemy);
                    return false;
                }
                return true;
            })

        })


        //
        // enemies.forEach(enemy => {
        //     Line.BresenhamPoints(this.line1).forEach((point, i) => {
        //         if (i > this.body.width) {
        //             if (Phaser.Math.Distance.Between(this.body.x + point.x, this.body.y + point.y, enemy.body.x, enemy.body.y) <
        //                 Phaser.Math.Distance.Between(
        //                     this.body.x + point.x,
        //                     this.body.y + point.y,
        //                     this.body.x + (i * Math.cos(this.angle)),
        //                     this.body.y + (i * Math.sin(this.angle)))) {
        //                 console.log(true);
        //             }
        //
        //         }
        //     });

            // let point = Line.BresenhamPoints(this.line1)[this.body.width + 1]
            // console.log(point);
            // console.log(Phaser.Math.Distance.Between(this.body.x + point.x, this.body.y + point.y, enemy.body.x, enemy.body.y) < i);
        // })

        // this.fillTriangle(0, 0,
        //     radius * Math.cos(angle), radius * Math.sin(angle),
        //     radius * Math.sin(angle), radius * -Math.cos(angle))

        // this.scene.physics.overlapRect(this.body.x, this.body.y, this.radius).forEach(body => {
        //     if (body.gameObject instanceof Enemy) {
        //         enemies.push(body.gameObject);
        //     }
        // })

        return enemies;
    }
}