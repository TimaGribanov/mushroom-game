import { Scene } from 'phaser'

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader')
    }

    init ()
    {
        this.add.image(0, 0, 'bg')

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff)

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress)

        })
    }

    preload ()
    {
        this.load.setPath('assets');

        this.load.image('bg', 'bg.png')
        this.load.image('ground', 'ground.png')
        this.load.image('ground-grass', 'ground-grass.png')
        this.load.image('shroom', 'shroom.png')
        this.load.image('enemy', 'enemy.png')
    }

    create ()
    {
        this.scene.start('MainMenu')
    }
}