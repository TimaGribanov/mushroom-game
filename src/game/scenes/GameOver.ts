import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    gameOverText: Phaser.GameObjects.Text
    screenWidth: integer
    screenHeight: integer

    constructor ()
    {
        super('GameOver');
    }
    
    init () {
        this.screenWidth = this.cameras.main.width
        this.screenHeight = this.cameras.main.height
    }

    create ()
    {
        this.background = this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'bg')

        this.gameOverText = this.add.text(this.screenWidth / 2, this.screenHeight / 4, 'Любов Степанівну Прибило', {
                fontFamily: 'PressStart2P',
                fontSize: 38,
                stroke: '#000', strokeThickness: 8,
                color: '#ffffff',
                align: 'center',
                wordWrap: { width: this.screenWidth - 30 }
        }).setOrigin(0.5).setDepth(100)
        
        const menuBtn = this.add.text(this.screenWidth / 2, this.screenHeight / 1.5, 'Меню', {
                fontFamily: 'PressStart2P',
                fontSize: 40,
                color: '#fff',
                align: 'center'
            }).setOrigin(0.5).setDepth(100)
            .setInteractive()
            .on('pointerdown', () => this.changeScene())
        
        EventBus.emit('current-scene-ready', this)
    }

    changeScene ()
    {
        this.scene.start('MainMenu')
    }
}