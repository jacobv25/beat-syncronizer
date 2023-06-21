var wavesurfer;

function initAudio(audioPath) {
    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple'
    });

    wavesurfer.load(audioPath);

    // Playback controls
    document.querySelector('#playButton').addEventListener('click', function() {
        wavesurfer.play();
    });

    document.querySelector('#pauseButton').addEventListener('click', function() {
        wavesurfer.pause();
    });

    document.querySelector('#stopButton').addEventListener('click', function() {
        wavesurfer.stop();
    });

    wavesurfer.on('audioprocess', function() {
        // Update timer display
        updateTimer();

        // Log a message when 10 seconds have passed
        if (Math.floor(wavesurfer.getCurrentTime()) === 10) {
            console.log('10 seconds have passed in the song');
        }
    });

    wavesurfer.on('ready', function () {
        wavesurfer.play();
    });

    wavesurfer.on('stop', function() {
        document.querySelector('#timer').textContent = '0:00';
    });
}

function updateTimer() {
    var currentTime = wavesurfer.getCurrentTime();
    var minutes = Math.floor(currentTime / 60);
    var seconds = Math.floor(currentTime % 60);
    if (seconds < 10) seconds = '0' + seconds;
    document.querySelector('#timer').textContent = minutes + ':' + seconds;
}
