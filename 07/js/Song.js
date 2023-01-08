class Song {
    constructor(audioFile) {
      this.audioFile = audioFile;
      this.audio = new Audio(this.audioFile);
    }
  
    play() {
      if (!this.isPlaying) {
        this.audio.play();
        this.isPlaying = true;
      } else {
        this.audio.pause();
        this.isPlaying = false;
      }
    }

    pause(){
      this.audio.pause();
      this.isPlaying = false;
    }

    updatePlayBackRate(coord, absX) {
        const size = coord == absX ? innerWidth/2 : innerHeight/2;
        const n = coord / size/2;
        this.audio.playbackRate = 1 - n;
    }

  }
  