import "../css/styles.css";
import Background from "./Background";
import Game from "./Game";
import Pipes from "./Pipes";
import animation from "./utils/animation";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const speed = 0.5;

const pipes = new Pipes(canvas, ctx, speed);
const bg = new Background(canvas, ctx);

const game = new Game(canvas, ctx);

function run() {

    bg.foregroundSpeed = speed;

    canvas.addEventListener('click', (e) => {

        switch (game.state) {
            case game.states.getReady:
                game.state = game.states.game;
                break;
            case game.states.game:
                console.log("flap");

                // ? Debug
                game.state = game.states.gameOver;

                break;
            case game.states.gameOver:
                game.state = game.states.getReady;
                game.restartGame(pipes.pipes);
                break;
        }
    });


    animation({
        clear() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },

        update(params) {

            if (game.state === game.states.game) {
                bg.update(params);
                pipes.update(params);
            }
        },

        render(params) {

            bg.render(params);

            if (game.state === game.states.getReady) {
                game.renderGetReady();
            }

            if (game.state === game.states.game) {
                pipes.render(params);
            }

            if (game.state === game.states.gameOver) {
                pipes.render(params);
                game.renderGameOver();
            }

        },
    });
}

run();