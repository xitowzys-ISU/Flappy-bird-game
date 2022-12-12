import "../css/styles.css";
import Background from "./Background";
import Pipes from "./Pipes";
import animation from "./utils/animation";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const pipes = new Pipes(canvas, ctx, 0.4);
const bg = new Background(canvas, ctx);

function run() {

    const speed = 0.4;
    bg.foregroundSpeed = speed;


    animation({
        clear() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },

        update(params) {
            bg.update(params);
            pipes.update(params);
        },

        render(params) {
            bg.render(params);
            pipes.render(params);
        },
    });
}

run();