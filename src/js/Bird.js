class Bird {
    constructor(canvas, ctx) {
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;

        this.gravity = 0.25;
        this.jump = 4.6;

        this.srcCurrentBird = new Image();
        this.srcCurrentBird.src = "./assets/sprites/bluebird-downflap.png";

        this.bird = function () {

            let srcBirdDownFlap = new Image();
            srcBirdDownFlap.src = "./assets/sprites/bluebird-downflap.png";

            let srcBirdMidFlap = new Image();
            srcBirdMidFlap.src = "./assets/sprites/bluebird-midflap.png";

            let srcBirdUpFlap = new Image();
            srcBirdUpFlap.src = "./assets/sprites/bluebird-upflap.png";


            return {
                width: srcBirdDownFlap.width,
                height: srcBirdDownFlap.height,
                images: [
                    srcBirdDownFlap,
                    srcBirdMidFlap,
                    srcBirdUpFlap
                ]
            }
        }()

        this.dx = 0;
        this.dy = 0;

        this.x = (this.canvas.width - this.srcCurrentBird.width) / 2;
        this.y = 210 + this.dy;

        this.animationBird();
    }

    animationBird(fps) {
        let step = fps / 3;

        this.bird.images.forEach((value, index, array) => {
            this.srcCurrentBird = value;
            console.log(this.srcCurrentBird);
        })

        let countImg = 0;

        setInterval(() => {

            if (countImg == this.bird.images.length) {
                countImg = 0;
            }

            this.srcCurrentBird = this.bird.images[countImg]

            countImg += 1;

            // console.log(countImg);
        }, 100);

    }

    resetBirdPosition() {
        this.y = 210;
        this.dy = 0;
    }

    // startAnimation() {
    //     this.animationBird();
    // }

    update(params) {
        this.dy += this.gravity;
    }

    flap() {
        this.dy -= this.jump;
    }

    detectCollision(pipes, fg) {
        //!

        if (this.y <= 0) {
            this.dy = 0;
            return true;
        }

        return false;
    }

    #drawCollision(x0, y0, x1, y1, color) {
        this.ctx.beginPath();
        this.ctx.rect(x0, y0, x1, y1);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    render(params) {

        // this.animationBird(params.fps);

        this.y += this.dy;

        this.ctx.drawImage(
            this.srcCurrentBird,
            (this.canvas.width - this.srcCurrentBird.width) / 2,
            this.y
        );

        this.#drawCollision(this.x, this.y, this.srcCurrentBird.width, this.srcCurrentBird.height, "yellow")
    }
}

export default Bird;