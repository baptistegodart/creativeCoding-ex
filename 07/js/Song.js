class Song {
    constructor(audioFile) {
      this.audioFile = audioFile;
      this.audio = new Audio(this.audioFile);
      this.source
      // this.source = this.audioContext.createMediaElementSource(this.audio);
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

    updatePlayBackRate(coord, absX, e) {
        const size = coord == absX ? innerWidth/2 : innerHeight/2;
        const n = coord / size/2;
        if(e.clientX > innerWidth/2){
          this.audio.playbackRate = 1 + n;
        }else{
          this.audio.playbackRate = 1 - n;
        }
    }

  }
  