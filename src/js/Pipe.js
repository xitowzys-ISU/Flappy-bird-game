class Pipe {
    constructor(canvas, ctx) {

        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;

        this.pipes = [];

        this.srcImagePipe = new Image();
        this.srcImagePipe.src = "./assets/sprites/pipe-green.png";

        // this.#addPipes(40, 10);

        this.speed = 0.1;

        // this.xMove = 10;
        this.xMove = 10;
        this.yMove = 0;

    }

    addPipes(height, gap) {

        if (height < 0) {
            height = 0;
            console.warn("The height is too small")
        }


        const topPipe = (testRotate) => {

            let x = this.canvas.width + (this.srcImagePipe.width / 2) + this.xMove;
            let y = 160 + height - gap;

            this.ctx.save();

            this.ctx.translate(x, y);

            this.ctx.rotate(180 * Math.PI / 180);

            this.ctx.drawImage(
                this.srcImagePipe,
                0,
                0,
                this.srcImagePipe.width,
                this.srcImagePipe.height + 0,
                -(this.srcImagePipe.width / 2),
                0,
                this.srcImagePipe.width,
                this.srcImagePipe.height
            )


            this.ctx.restore();

            // this.ctx.fillRect(x, y, 10, 10);
        };

        const topPipeNew = {
            collision: {
                x0: -(this.srcImagePipe.width / 2) + this.xMove,
                y0: -160 + height,
                x1: this.srcImagePipe.width,
                y1: this.srcImagePipe.height - gap
            },
            draw: () => {

                let x = this.canvas.width + (this.srcImagePipe.width / 2) + this.xMove;
                let y = 160 + height - gap;

                this.ctx.save();

                this.ctx.translate(x, y);

                this.ctx.rotate(180 * Math.PI / 180);

                this.ctx.drawImage(
                    this.srcImagePipe,
                    0,
                    0,
                    this.srcImagePipe.width,
                    this.srcImagePipe.height + 0,
                    -(this.srcImagePipe.width / 2),
                    0,
                    this.srcImagePipe.width,
                    this.srcImagePipe.height
                )


                this.ctx.restore();
            }
        };


        const bottomPipeNew = {
            collision: {
                x0: this.canvas.width + this.xMove,
                y0: 160 + height,
                x1: this.srcImagePipe.width,
                y1: this.srcImagePipe.height - height - 80
            },
            draw: () => {


                this.ctx.save();

                this.ctx.drawImage(
                    this.srcImagePipe,
                    0,
                    -height - 80,
                    this.srcImagePipe.width,
                    this.srcImagePipe.height + 0,
                    this.canvas.width + this.xMove,
                    80,
                    this.srcImagePipe.width,
                    this.srcImagePipe.height
                )

                this.ctx.restore();
            }
        }

        const emptyCollision = {
            collision: {
                x0: this.canvas.width + this.xMove,
                y0: 160 + height - gap,
                x1: this.srcImagePipe.width,
                y1: gap
            }
        }


        this.pipes.push({
            top: topPipeNew,
            bottom: bottomPipeNew,
            emptyCollision: emptyCollision
        });

        // console.debug(this.xMove);
        // console.debug(bottomPipeNew);
    }

    update(params) {
        this.pipes.forEach((pipe) => {
            pipe.top.collision.x0 = this.canvas.width + this.xMove;
            pipe.bottom.collision.x0 = this.canvas.width + this.xMove;
            pipe.emptyCollision.collision.x0 = this.canvas.width + this.xMove;
        });

        this.#deletePipe();
    }

    render(params) {
        this.pipes.forEach((pipe) => {
            // pipe.top(this.testRotate)
            pipe.bottom.draw();
            pipe.top.draw();
            // console.debug(pipe.bottom.collision);

            // pipe.bottom.collision.x0 = this.canvas.width + this.xMove;
            this.#drawCollision(pipe.bottom.collision.x0, pipe.bottom.collision.y0, pipe.bottom.collision.x1, pipe.bottom.collision.y1, 'red');
            this.#drawCollision(pipe.top.collision.x0, pipe.top.collision.y0, pipe.top.collision.x1, pipe.top.collision.y1, 'red');
            this.#drawCollision(pipe.emptyCollision.collision.x0, pipe.emptyCollision.collision.y0, pipe.emptyCollision.collision.x1, pipe.emptyCollision.collision.y1, 'green');
            // console.log(pipe.bottom.collision.x0);

        });

        this.xMove -= this.speed;
    }

    #deletePipe() {
        if (this.pipes.length != 0) {
            if (this.pipes[0].bottom.collision.x0 < -100) {
                console.debug("DELETE");
                this.pipes.shift();
            }
        }
    }

    #drawCollision(x0, y0, x1, y1, color) {
        this.ctx.beginPath();
        this.ctx.rect(x0, y0, x1, y1);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
}

export default Pipe;
