class Audios {
    constructor(collection) {
        this.collection = {
            point: './assets/audio/point.wav',
            flap: './assets/audio/wing.wav',
            hit: './assets/audio/hit.wav',
            swoosh: './assets/audio/swoosh.wav',
            die: './assets/audio/die.ogg',
            background: './assets/audio/background.ogg'
        };

        for (let name in this.collection) {
            const audio = new Audio();
            audio.src = this.collection[name];

            this.collection[name] = audio;
        }

        // console.log(this.collection);
    }

    /**
     * Play a sound from the collection by its name
     * @param {string} name 
     */
    play(name) {
        if (this.collection[name].paused) {
            this.collection[name].play();
        } else {
            this.collection[name].pause();
            this.collection[name].currentTime = 0;
            this.collection[name].play();
        }
    }

    playLoop(name) {
        if (this.collection[name].paused) {
            this.collection[name].loop = true;
            this.collection[name].play();
        } else {
            this.collection[name].pause();
            this.collection[name].currentTime = 0;
            this.collection[name].play();
        }
    }

    stop(name) {
        this.collection[name].pause();
        this.collection[name].currentTime = 0;
    }
}

export default Audios;