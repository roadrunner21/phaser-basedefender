import Weapon from "./Weapon";

export default class Fist extends Weapon {

    constructor(scene) {
        super(scene);

        this.attack = 15;
        this.radius = 50;
        this.speed = 2500; // attack delay in ms
        this.aoe = true;
        this.attackAngle = 60;

    }
}