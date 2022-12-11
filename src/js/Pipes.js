class Pipes {
    constructor() {
        this.pipes = []
    }

    update(params) {

    }

    render(params) {

    }

    #deletePipe() {
        if (this.pipes.length != 0) {
            if (this.pipes[0].bottom.collision.x0 < -100) {
                console.debug("DELETE");
                this.pipes.shift();
            }
        }
    }
}