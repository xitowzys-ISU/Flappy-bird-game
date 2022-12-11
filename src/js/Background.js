class Background {

    #xForeground = 0.0;
    #xBackground = 0.0;

    constructor(canvas, ctx) {
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;

        this.srcImageBackground = new Image();
        this.srcImageBackground.src = "./assets/sprites/background-day.png";

        this.srcImageForeground = new Image();
        this.srcImageForeground.src = "./assets/sprites/base.png";

        this.foregroundSpeed = 0.3;
        this.backgroundSpeed = 0.1;
    }


    update(params) {
        this.#xForeground += this.foregroundSpeed;
        this.#xBackground += this.backgroundSpeed;
    }

    render(params) {
        this.#renderBackground();
        this.#renderForeground();
    }

    #renderBackground() {
        this.ctx.drawImage(
            this.srcImageBackground,
            0 - this.#xBackground,
            0
        );

        this.ctx.drawImage(
            this.srcImageBackground,
            this.srcImageBackground.width - this.#xBackground - 1,
            0
        );

        if (this.#xBackground >= this.srcImageBackground.width) {
            this.#xBackground = 0.0;
        }

    }

    #renderForeground() {
        this.ctx.drawImage(
            this.srcImageForeground,
            0 - this.#xForeground,
            this.canvas.height - this.srcImageForeground.height
        );
        this.ctx.drawImage(
            this.srcImageForeground,
            this.srcImageForeground.width - this.#xForeground,
            this.canvas.height - this.srcImageForeground.height
        );


        if (this.#xForeground >= this.srcImageForeground.width) {
            this.#xForeground = 0.0;
        }

    }
}

export default Background;