class Game {
    constructor(canvas, ctx) {

        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;


        // Game states
        this.states = {
            getReady: 0,
            game: 1,
            gameOver: 2,
        };

        this.state = this.states.getReady;

        this.score = 0;

        this.getReadyImage = new Image();
        this.getReadyImage.src = "./assets/sprites/message.png";
        this.gameOverImage = new Image();
        this.gameOverImage.src = "./assets/sprites/gameover.png";
    }

    restartGame(pipes) {
        pipes.forEach((pipe) => {
            console.log(pipe);
            pipes.shift();
        });
        
    }

    renderGetReady() {
        this.ctx.drawImage(
            this.getReadyImage,
            (this.canvas.width - this.getReadyImage.width) / 2,
            40
        );
    }

    renderGameOver() {
        this.ctx.drawImage(
            this.gameOverImage,
            (this.canvas.width - this.getReadyImage.width) / 2,
            80
        );
    }

    renderScore() {

    }
}

export default Game;