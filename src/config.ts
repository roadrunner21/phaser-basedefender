import { GAME_HEIGHT, GAME_WIDTH } from "./const";
import GameScene from "./Scenes/GameScene";
import MenuScene from "./Scenes/MenuScene";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#6DAA2B',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [GameScene, MenuScene]
};

export default config;