class Audios {
    constructor(collection) {
        this.collection = {
            point: './assets/audio/point.ogg',
            flap: './assets/audio/wing.ogg',
            hit: './assets/audio/hit.ogg',
            swoosh: './assets/audio/swoosh.ogg',
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
    play(name, volume = 1) {
        if (this.collection[name].paused) {
            this.collection[name].volume = volume;
            this.collection[name].play();
        } else {
            this.collection[name].pause();
            this.collection[name].volume = volume;
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