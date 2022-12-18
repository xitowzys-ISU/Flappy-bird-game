class Background {

    #xForeground = 0.0;
    #xBackground = 0.0;

    constructor(canvas, ctx) {
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;

        this.srcImageBackground = new Image();
        this.srcImageBackground.src = "./assets/sprites/background.png";

        this.srcImageBackground_1 = new Image();
        this.srcImageBackground_1.src = "./assets/sprites/background_1.png";

        this.srcImageBackground_2 = new Image();
        this.srcImageBackground_2.src = "./assets/sprites/background_2.png";

        this.srcImageForeground = new Image();
        this.srcImageForeground.src = "./assets/sprites/base_pink.png";

        this.foregroundSpeed = 0.3;
        this.backgroundSpeed = 1;
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
            0,
            0
        );

        this.ctx.drawImage(
            this.srcImageBackground_1,
            0 - this.#xBackground,
            0
        );

        this.ctx.drawImage(
            this.srcImageBackground_2,
            this.srcImageBackground_2.width - this.#xBackground - 1,
            0
        );

        this.ctx.drawImage(
            this.srcImageBackground_1,
            this.srcImageBackground_2.width * 2 - this.#xBackground - 1,
            0
        );

        if (this.#xBackground >= this.srcImageBackground_2.width * 2) {
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