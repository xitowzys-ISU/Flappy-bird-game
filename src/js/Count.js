class Count {
    constructor(canvas, ctx) {
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;

        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;

        this.count = 0;

        this.srcImages = {};

        for (let index = 0; index <= 9; index++) {

            let image = new Image();
            image.src = `./assets/sprites/${index}.png`;

            this.srcImages[index] = image;

        }
    }

    update() {

    }

    render(params) {

        let countString = this.count.toString();

        let tmp = -this.srcImages[parseInt(countString.charAt(countString.length - 1))].width;

        if (countString.length - 1 === 1) {
            tmp /= 2;
        }

        if (countString.length - 1 === 0) {
            this.ctx.drawImage(
                this.srcImages[parseInt(countString.charAt(i))],
                this.canvas.width / 2,
                20
            );
        } else {
            for (var i = 0; i < countString.length; i++) {
                this.ctx.drawImage(
                    this.srcImages[parseInt(countString.charAt(i))],
                    this.canvas.width / 2 + tmp,
                    20
                );


                tmp += this.srcImages[parseInt(countString.charAt(i))].width;
            }

        }
    }

}

export default Count;