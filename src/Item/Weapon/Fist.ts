import Weapon from "./Weapon";

export default class Fist extends Weapon {
    attack = 2;
    radius = 25;
    speed = 1;
    aoe: true;
}