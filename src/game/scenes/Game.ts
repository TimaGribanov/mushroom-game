import {EventBus} from '../EventBus'
import {Scene} from 'phaser'

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    player: Phaser.Physics.Arcade.Sprite
    enemy: Phaser.Physics.Arcade.Sprite
    gameOver: boolean
    isMobile: boolean
    screenWidth: integer
    screenHeight: integer
    gameWidth: integer
    gameHeight: integer
    isMovingRight: boolean
    isMovingLeft: boolean
    isMovingUp: boolean
    left: Phaser.Input.Keyboard.Key
    right: Phaser.Input.Keyboard.Key
    up: Phaser.Input.Keyboard.Key

    constructor() {
        super('Game')
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.gameOver = false
        this.isMobile = false

        this.screenWidth = this.cameras.main.width
        this.screenHeight = this.cameras.main.height
        this.gameWidth = this.screenWidth
        this.gameHeight = this.screenHeight

        this.isMovingLeft = false
        this.isMovingRight = false
        this.isMovingUp = false

        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    }

    create() {
        this.input.addPointer(2)
        
        if (this.sys.game.device.os.desktop) {
            console.log("desktop")
        } else {
            console.log("mobile")
            this.isMobile = true
            this.gameHeight = this.screenHeight / 2
            let touchControl: Object = {
                width: this.gameWidth,
                height: this.game
            }
        }

        this.background = this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'bg')

        let ground: Phaser.Physics.Arcade.StaticGroup = this.physics.add.staticGroup()
        for (let i = 16; i < this.gameWidth; i += 32) {
            for (let j = this.gameHeight - 48; j < this.gameHeight; j += 32) {
                ground.create(i, j, 'ground')
            }

            ground.create(i, this.gameHeight - 80, 'ground-grass')
        }
        if (this.isMobile) {
            this.add.text(this.gameWidth / 2 - this.gameWidth / 4, this.gameHeight + this.gameHeight / 2, '<', {
                fontFamily: 'PressStart2P', fontSize: 50, color: '#fff',
                stroke: '#000', strokeThickness: 8,
                align: 'center'
            })
                .setOrigin(0.5)
                .setDepth(100)
                .setInteractive()
                .on('pointerdown', () => this.isMovingLeft = true)
                .on('pointerup', () => this.isMovingLeft = false)

            this.add.text(this.gameWidth / 2 + this.gameWidth / 4, this.gameHeight + this.gameHeight / 2, '>', {
                fontFamily: 'PressStart2P', fontSize: 50, color: '#fff',
                stroke: '#000', strokeThickness: 8,
                align: 'center'
            })
                .setOrigin(0.5)
                .setDepth(100)
                .setInteractive()
                .on('pointerdown', () => this.isMovingRight = true)
                .on('pointerup', () => this.isMovingRight = false)

            this.add.text(this.gameWidth / 2, this.gameHeight + this.gameHeight / 4, 'Λ', {
                fontFamily: 'PressStart2P', fontSize: 50, color: '#fff',
                stroke: '#000', strokeThickness: 8,
                align: 'center'
            })
                .setOrigin(0.5)
                .setDepth(100)
                .setInteractive()
                .on('pointerdown', () => this.isMovingUp = true)
                .on('pointerup', () => this.isMovingUp = false)
        }

        this.player = this.physics.add.sprite(64, this.gameHeight - 112, 'shroom')
        this.player.setGravityY(1000)
        this.player.setCollideWorldBounds(true)

        this.enemy = this.physics.add.sprite(this.gameWidth - (this.gameWidth / 6), this.gameHeight - 112, 'enemy')
        this.enemy.setCollideWorldBounds(true)

        function hitEnemy(player, enemy) {
            if (player.body.touching.down && enemy.body.touching.up) {
                this.physics.pause()

                enemy.setTint(0xff0000)

                this.gameOver = false
                this.changeScene()
            } else {
                this.physics.pause()

                player.setTint(0xff0000)

                this.gameOver = true
                this.changeScene()
            }
        }

        this.physics.add.collider(this.player, ground)
        this.physics.add.collider(this.enemy, ground)
        this.physics.add.collider(this.player, this.enemy, hitEnemy, null, this)

        EventBus.emit('current-scene-ready', this)
    }

    update() {
        if (this.cursors.left.isDown || this.left.isDown || this.isMovingLeft) {
            this.player.setVelocityX(-400)
        } else if (this.cursors.right.isDown || this.right.isDown || this.isMovingRight) {
            this.player.setVelocityX(400)
        } else {
            this.player.setVelocityX(0)
        }

        if ((this.cursors.up.isDown || this.up.isDown || this.isMovingUp) && this.player.body.touching.down) {
            this.player.setVelocityY(-330)
        }
    }

    changeScene() {
        if (this.gameOver)
            this.scene.start('GameOver')
        else
            this.scene.start('WinScene')
    }
}