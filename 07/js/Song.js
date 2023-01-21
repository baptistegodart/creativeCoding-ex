class Song {
    constructor(audioFile) {
      this.audioFile = audioFile;
      this.audio = new Audio(this.audioFile);
      this.source
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

    updatePlayBackRate(coord, e) {
        const size = innerWidth/2;
        const n = coord / size/1.2;
        
        if(e.clientX > innerWidth/2){
          this.audio.playbackRate = 1 + n;
        }else{
          this.audio.playbackRate = 1 - n;
        }

        if(n<0.05){
          this.audio.playbackRate = 1;
        }

    }

}
  