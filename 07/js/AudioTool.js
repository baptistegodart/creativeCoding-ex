class AudioTool {
  constructor() {}

  initAudioContext(sources) {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.initBroadcast(sources);
    this.setupAnalyser(sources);
  }

  initBroadcast(sources) {

    for(let i = 0; i < sources.length; i++){
      sources[i].source = this.audioContext.createMediaElementSource(sources[i].song.audio);
    }

  }

  setupAnalyser(sources) {
    this.analyser = this.audioContext.createAnalyser();
  
    for(let i = 0; i < sources.length; i++){
      sources[i].source.connect(this.analyser);
    }

    this.analyser.connect(this.audioContext.destination);
    console.log(this.audioContext.destination);
    
    this.analyser.fftSize = 2048; // Nombre de data (niveau de précision)
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

  calcMediane(){
    this.mediane = 0;
    this.total = 0;
    for(let i=0; i<this.dataFrequency.length; i++){
      this.total += this.dataFrequency[i]
    }
    this.mediane = this.total/this.dataFrequency.length;

    return this.total
  }
}
