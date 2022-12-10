import "../css/styles.css";
import Background from "./Background";
import animation from "./utils/animation";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function run() {
    const bg = new Background(canvas, ctx);


    animation({
        clear() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },

        update(params) {
            bg.update(params);
        },

        render(params) {
            bg.render(params);
        },
    });
}

run();