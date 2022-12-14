import Pipe from "./Pipe";

class Pipes {

    #timestamp;

    constructor(canvas, ctx, speed) {

        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;

        this.pipes = [];
        this.countPipes = 1;

        // this.#generatePipe();


        this.showCollision = true;

        this.speed = speed;

        this.interval = 8000;
        this.#timestamp = 1;
    }

    update(params) {
        this.pipes.forEach((pipe) => {

            this.#movePipe(pipe);

            pipe.pipe.top.collision.x0 = this.canvas.width + pipe.xMove;
            pipe.pipe.bottom.collision.x0 = this.canvas.width + pipe.xMove;
            pipe.pipe.emptyCollision.collision.x0 = this.canvas.width + pipe.xMove;

            // console.log(pipe.pipe);
        });

        // this.#deletePipe();
    }

    render(params) {

        if (params.timestamp > this.#timestamp) {
            this.#timestamp += this.interval;
            this.#generatePipe();
            // generatePipes();
            // console.log("go");
        }

        this.pipes.forEach((pipe) => {
            // pipe.top(this.testRotate)

            pipe.pipe.bottom.draw();
            pipe.pipe.top.draw();


            if (this.showCollision) {
                // console.log(pipe.pipe.top.collision.x0);
                this.#drawCollision(pipe.pipe.bottom.collision.x0, pipe.pipe.bottom.collision.y0, pipe.pipe.bottom.collision.x1, pipe.pipe.bottom.collision.y1, 'red');
                this.#drawCollision(pipe.pipe.top.collision.x0, pipe.pipe.top.collision.y0, pipe.pipe.top.collision.x1, pipe.pipe.top.collision.y1, 'red');

                this.#drawCollision(pipe.pipe.emptyCollision.collision.x0, pipe.pipe.emptyCollision.collision.y0, pipe.pipe.emptyCollision.collision.x1, pipe.pipe.emptyCollision.collision.y1, 'green');
            }

            this.#deletePipe();


        });
    }

    #movePipe(pipe) {
        pipe.xMove -= this.speed;
        // pipe.bottom.collision.x0 = 200;
        // console.log(pipe.bottom.collision.x0);
    }

    #generatePipe() {
        let pipe = new Pipe(this.canvas, this.ctx);

        console.log(Math.random() + 1);

        pipe.generatePipe(Math.floor(Math.random() * 290) + 2, 100);

        this.pipes.push(pipe);

        // console.log(this.pipes);
        // console.log(pipe.addPipes(30, 40));
    }

    #drawCollision(x0, y0, x1, y1, color) {
        this.ctx.beginPath();
        this.ctx.rect(x0, y0, x1, y1);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    #deletePipe() {

        if (this.pipes.length != 0) {
            if (this.pipes[0].pipe.bottom.collision.x0 < -100) {
                console.debug("DELETE");
                this.pipes.shift();
            }
        }
    }

}

export default Pipes;