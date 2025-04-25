const express = require('express');
const PeerServer = require('peer').PeerServer;
const http = require('http');
const app = express();
const PORT = process.env.PORT || 9000;

// Create an HTTP server
const server = http.createServer(app);

// Mount the PeerJS server on the /peerjs route
const peerServer = PeerServer({
    port: PORT,
    path: '/peerjs',
    cors: {
        origin: '*',  // Allow all domains, adjust if you have specific domains
        methods: ['GET', 'POST']
    }
});

app.use('/node_modules', express.static('node_modules'));


// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server on port 9000
app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});


