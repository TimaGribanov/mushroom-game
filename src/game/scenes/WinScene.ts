import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class WinScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    winText: Phaser.GameObjects.Text
    screenWidth: integer
    screenHeight: integer

    constructor ()
    {
        super('WinScene')
    }
    
    init () {
        this.screenWidth = this.cameras.main.width
        this.screenHeight = this.cameras.main.height
    }

    create ()
    {
        this.camera = this.cameras.main

        this.background = this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'bg')

        this.winText = this.add.text(this.screenWidth / 2, this.screenHeight / 4, 'Ура! Победа!', {
            fontFamily: 'PressStart2P', fontSize: 38, color: '#ffffff',
            stroke: '#000', strokeThickness: 8,
            align: 'center', wordWrap: { width: this.screenWidth - 30 }
        }).setOrigin(0.5).setDepth(100)
        
        this.add.text(this.screenWidth / 2, this.screenHeight / 1.5, 'Меню', {
            fontFamily: 'PressStart2P', fontSize: 40, color: '#fff', align: 'center'
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