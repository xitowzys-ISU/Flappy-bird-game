class Pipe {
    constructor(canvas, ctx) {

        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;


        this.srcImagePipe = new Image();
        this.srcImagePipe.src = "./assets/sprites/pipe-pink.png";

        this.speed = 0.1;

        this.xMove = 30;
        this.yMove = 0;

        this.pipe = null;
    }

    generatePipe(height, gap) {
        let xAddition = 0;

        if (height < 0) {
            height = 0;
            console.warn("The height is too small")
        } else if (height > 240) {
            height = 240;
            console.warn("The height is too big")
        }

        if (gap < 0) {
            gap = 0;
            console.warn("Negative indentation")
        }

        // console.log(80 + height - gap);

        if (80 + height - gap < 40) {
            xAddition = 40 - (80 + height - gap);
            console.warn("The upper pipe has reached the limit")
        }


        const topPipeNew = {
            collision: {
                x0: this.canvas.width,
                y0: -this.srcImagePipe.height + height + 80,
                x1: this.srcImagePipe.width,
                y1: this.srcImagePipe.height - gap + xAddition
            },
            draw: () => {

                let x = this.canvas.width + (this.srcImagePipe.width / 2) + this.xMove;
                let y = 80 + height - gap + xAddition;

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
                x0: this.canvas.width,
                y0: 80 + height,
                x1: this.srcImagePipe.width,
                y1: this.srcImagePipe.height - height
            },
            draw: () => {


                this.ctx.save();

                this.ctx.drawImage(
                    this.srcImagePipe,
                    0,
                    -height,
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
                x0: this.canvas.width,
                y0: 80 + height - gap + xAddition,
                x1: this.srcImagePipe.width,
                y1: gap - xAddition,
                used: false
            }
        }


        this.pipe = {
            top: topPipeNew,
            bottom: bottomPipeNew,
            emptyCollision: emptyCollision
        }
    }
}

export default Pipe;
