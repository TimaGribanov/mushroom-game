import { GameObjects, Scene } from 'phaser'
import { EventBus } from '../EventBus'

export class MainMenu extends Scene
{
    background: GameObjects.Image
    title: GameObjects.Text
    screenWidth: integer
    screenHeight: integer

    constructor ()
    {
        super('MainMenu')
    }
    
    init () {
        this.screenWidth = this.cameras.main.width
        this.screenHeight = this.cameras.main.height
    }

    create ()
    {
        this.background = this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'bg')

        this.title = this.add.text(this.screenWidth / 2, this.screenHeight / 4, 'Игра, в которой ты типа грибок', {
            fontFamily: 'PressStart2P', fontSize: 38, color: '#fff',
            stroke: '#000', strokeThickness: 8,
            align: 'center', wordWrap: { width: this.screenWidth - 30 }
        }).setOrigin(0.5).setDepth(100)
        
        const gameBtn = this.add.text(this.screenWidth / 2, this.screenHeight / 1.5, 'Начать', {
                fontFamily: 'PressStart2P', fontSize: 40, color: '#fff', align: 'center'
            }).setOrigin(0.5).setDepth(100)
            .setInteractive()
            .on('pointerdown', () => this.changeScene())

        this.add.text(this.screenWidth - 50, this.screenHeight - 20, 'GitHub', {
            fontFamily: 'PressStart2P', fontSize: 12, color: '#000', align: 'center'
        }).setOrigin(0.5).setDepth(100)
        .setInteractive()
        .on('pointerdown', () => window.open('https://github.com/TimaGribanov/mushroom-game', '_blank').focus())

        EventBus.emit('current-scene-ready', this)
    }
    
    changeScene ()
    {
        this.scene.start('Game')
    }
}