import 'phaser';
import Menu from "../Menu/Menu";
import { GAME_HEIGHT, GAME_WIDTH } from "../const";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }


    preload() {
    }

    create() {
        new Menu(this, GAME_WIDTH/2, GAME_HEIGHT/2);
    }

    update(time, delta) {
    }
}
