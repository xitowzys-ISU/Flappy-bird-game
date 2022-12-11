import "../css/styles.css";
import Background from "./Background";
import Pipe from "./Pipe";
import animation from "./utils/animation";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pipe = new Pipe(canvas, ctx);
const bg = new Background(canvas, ctx);

function generatePipes() {
    pipe.addPipes(30, 120);
}

function run() {


    let timestamp = 0;
    let inverval = 5000;

    const speed = 0.4;
    pipe.speed = speed;
    bg.foregroundSpeed = speed;
    generatePipes();



    // pipe.addPipes(3, 40);


    animation({
        clear() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },

        update(params) {
            bg.update(params);
            pipe.update(params);
            // console.log(params);
        },

        render(params) {
            bg.render(params);
            pipe.render(params);

            // if (params.timestamp > timestamp) {
            //     timestamp += inverval;

            //     generatePipes();
            //     console.log("go");
            // }

        },
    });
}

run();