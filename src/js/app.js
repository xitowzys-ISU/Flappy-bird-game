import "../css/styles.css";
import Audios from "./Audios";
import Background from "./Background";
import Bird from "./Bird";
import Count from "./Count";
import Game from "./Game";
import Pipes from "./Pipes";
import animation from "./utils/animation";

/** @type {HTMLCanvasElement} */


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const startSpeed = 2;

let speed = 0;

const game = new Game(canvas, ctx);
const pipes = new Pipes(canvas, ctx, 0);
const bg = new Background(canvas, ctx);
const bird = new Bird(canvas, ctx);

const count = new Count(canvas, ctx);

const audio = new Audios();

// let counts = 0;



function run() {

    let gamesEvents = function () {
        switch (game.state) {
            case game.states.getReady:
                game.state = game.states.game;
                audio.playLoop("background");
                break;
            case game.states.game:
                audio.play("flap");
                bird.flap();
                break;
            case game.states.gameOver:
                audio.play("swoosh");
                game.state = game.states.getReady;
                game.restartGame(pipes.pipes);
                bird.resetBirdPosition();
                break;
        }
    }

    canvas.addEventListener('click', (e) => {
        gamesEvents();
    });

    document.addEventListener('keydown', function (event) {
        event.preventDefault();
        if (event.code == 'Enter' || event.code == 'Space' || event.code == 'ArrowUp') {
            gamesEvents();
        }
    });


    animation({
        clear() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },

        update(params) {

            speed = startSpeed + count.count * 0.02
            pipes.speed = speed;
            bg.foregroundSpeed = speed;
            // console.log(speed);

            if (game.state === game.states.game) {
                bg.update(params);
                pipes.update(params);
                bird.update(params);

                if (bird.detectCollision(pipes.pipes, bg, count, audio)) {
                    audio.play("hit");
                    audio.play("die");
                    audio.stop("background");
                    game.state = game.states.gameOver;
                }

            }

        },

        render(params) {

            bg.render(params);

            if (game.state === game.states.getReady) {
                game.renderGetReady();
            }

            if (game.state === game.states.game) {
                pipes.render(params);
                count.render();
            }

            if (game.state === game.states.gameOver) {
                pipes.render(params);
                game.renderGameOver();
                count.render();
            }

            bird.render(params);

        },
    });
}

run();

// setTimeout(function () {
//     run();
// }, 1000)
