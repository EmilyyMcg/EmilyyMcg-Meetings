document.addEventListener("DOMContentLoaded", function () {
console.log("DOM LOADED");
    const Peer = new Peer("pick-an-id");
    const peer = new Peer({
        host: 'learning-lounge-meetings.onrender.com',
        port: 9000,
        path: '/peerjs'
    });

    peer.on('open', id => {
        document.getElementById('peer-id').value = id;
    });
    let currentCall;

    document.getElementById('connect-button').addEventListener('click', () => {
        const peerId = document.getElementById('connect-id').value;
        if (peerId) {
            currentCall = peer.call(peerId, localStream);

            currentCall.on('stream', remoteStream => {
                addVideoStream(remoteStream);
            });

            currentCall.on('error', err => {
                console.error('Failed to connect:', err);
                alert('Failed to connect to peer.');
            });
        } else {
            alert('Please enter a peer ID to connect.');
        }
    });

    document.getElementById('disconnect-button').addEventListener('click', () => {
        if (currentCall) {
            currentCall.close();
            currentCall = null;
            alert('Disconnected from peer.');
            document.getElementById('remote-video-container').innerHTML = '';
        }
    });

    let audioEnabled = true;

    document.getElementById('mute-button').addEventListener('click', () => {
        if (!localStream) {
            alert('Audio stream is not ready yet.');
            return;
        }
        audioEnabled = !audioEnabled;
        localStream.getAudioTracks()[0].enabled = audioEnabled;
        document.getElementById('mute-button').textContent = audioEnabled ? 'Mute' : 'Unmute';
    });

    let videoEnabled = true;

    document.getElementById('stop-video-button').addEventListener('click', () => {
        if (!localStream) {
            alert('Video stream is not ready yet.');
            return;
        }
        videoEnabled = !videoEnabled;
        localStream.getVideoTracks()[0].enabled = videoEnabled;
        document.getElementById('stop-video-button').textContent = videoEnabled ? 'Stop Video' : 'Start Video';
    });


    peer.on('call', call => {
        call.answer(localStream);

        call.on('stream', remoteStream => {
            addVideoStream(remoteStream);
        });

        call.on('error', err => {
            console.error('Call failed:', err);
            alert('Call failed.');
        });

        currentCall = call;
    });

    function addVideoStream(stream) {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        document.getElementById('remote-video-container').append(video);
    }





    let localStream;

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        localStream = stream;


    }).catch(error => {
        console.error('Error accessing media devices.', error);
    });
});

