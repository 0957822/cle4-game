/// <reference path="terminal1Player.ts"/>
/// <reference path="terminal1Block.ts"/>

class GameTerminal1 {
    // Fields
    private _div : HTMLElement
    private gameInstance : Game

    private player : Terminal1Player
    private block : Terminal1Block
    private block2 : Terminal1Block
    private background : Terminal1Background
    private border : Terminal1Border

    private score : number = 0

    // Inputs
    private xKey : number

    // Constructor
    constructor(gameInstance : Game) {
        console.log("TERMINAL CLASS STARTED")

        this._div = document.createElement("div")

        this.gameInstance = gameInstance

        let game = document.getElementsByTagName("gameterminal1")[0]
        game.appendChild(this._div)

        this.xKey = 100

        this.player = new Terminal1Player()
        this.block = new Terminal1Block(100)
        this.block2 = new Terminal1Block(1000, 79, 75)
        this.background = new Terminal1Background()
        this.border = new Terminal1Border()

        this.gameInstance.playingTerminal1 = true

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        this.gameLoop()
    }


    // Functions

    // Init Functions

    // gameLoop
    private gameLoop(){
        this.player.update()
        this.block.update()
        this.block2.update()

        this.checkBlockPlayerCollision(this.player)

        console.log("onegameloop")

        if(this.gameInstance.playingTerminal1) {
            requestAnimationFrame(()=>this.gameLoop())
        }
    
    }

    // Loop Functions
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.xKey:
                this.finnishGame()
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.xKey:
                break
        }
    }

    checkBlockPlayerCollision(player : Terminal1Player) {

        let hit = this.checkCollision(player.getRectangle(), this.block.getRectangle())
        let hit2 = this.checkCollision(player.getRectangle(), this.block2.getRectangle())

        if (hit) {
            this.updateScore(-1)
            this.gameOver()
        }

        if (hit2) {
            this.updateScore(2)
            this.gameWin()
        }
    }
    
    
    updateScore(addScoreAmount: number) {
        this.score += addScoreAmount
        // document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`
    }


    // General Functions
    public checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }

    gameOver() {
        console.log("YOU HAVE DIED")
        document.getElementsByTagName("message")[0].innerHTML = `YOU HAVE DIED`
        this.killAll()
        this.gameInstance.playingTerminal1 = false
        this.gameInstance.reset()
        this.gameInstance.gameLoop()
    }

    gameWin() {
        this.killAll()
        this.gameInstance.playingTerminal1 = false
        this.gameInstance.gameLoop()
    }

    finnishGame() {
        this.killAll()
        this.gameInstance.playingTerminal1 = false
        this.gameInstance.gameLoop()
    }

    killAll() {
        this.block.div.remove()
        this.block2.div.remove()
        this.player.div.remove()
        this.background.div.remove()
        this.border.div.remove()
    }

    sleep(milliseconds : number) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
}