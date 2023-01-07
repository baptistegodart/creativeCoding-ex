class AudioTool {
    constructor() {
      this.audioFile = "assets/sounds/grimes.mp3";
      this.audio = new Audio(this.audioFile);
    }
  
    initAudioContext() {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.initBroadcast();
      this.setupAnalyser();
    }
  
    initBroadcast() {
      this.source = this.audioContext.createMediaElementSource(this.audio);
    }
  
    setupAnalyser() {
      this.analyser = this.audioContext.createAnalyser();
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      
      this.analyser.fftSize = 2048;
      this.bufferLength = this.analyser.frequencyBinCount;

      //tableau de data (2 type)
      this.dataFrequency = new Uint8Array(this.bufferLength);
      this.dataFloatFrequency = new Float32Array(this.bufferLength);
      this.dataWave = new Uint8Array(this.bufferLength);
    }
    updateWaveForm() {
      this.analyser.getByteTimeDomainData(this.dataWave);
    }
    updateFrequency() {
      this.analyser.getByteFrequencyData(this.dataFrequency);
    }
    updatedFloatFrequency() {
      this.analyser.getFloatFrequencyData(this.dataFloatFrequency);
    }
    play() {
      if (!this.isPlaying) {
        if (!this.audioContext) {
          this.initAudioContext();
        }
        this.audio.play();
        this.isPlaying = true;
      } else {
        this.audio.pause();
        this.isPlaying = false;
      }
    }

    updatePlayBackRate(coord, absX) {
        const size = coord == absX ? innerWidth/2 : innerHeight/2;
        const n = coord / size/2;
        this.audio.playbackRate = 1 - n;
      }
  }
  