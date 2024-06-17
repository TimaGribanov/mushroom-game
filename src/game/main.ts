import { Boot } from './scenes/Boot'
import { GameOver } from './scenes/GameOver'
import { Game as MainGame } from './scenes/Game'
import { MainMenu } from './scenes/MainMenu'
import { WEBGL, Game } from 'phaser'
import { Preloader } from './scenes/Preloader'
import { WinScene } from './scenes/WinScene'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: WEBGL,
    width: '100%',
    height: '100%',
    parent: 'game-container',
    backgroundColor: '#61b3e9',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver,
        WinScene
    ]
}

const StartGame = (parent: string) => {

    return new Game({ ...config, parent })

}

export default StartGame