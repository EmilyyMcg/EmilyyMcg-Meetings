const express = require('express');
const { ExpressPeerServer } = require('peer');
const http = require('http');


// Initialize Express app
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Create a PeerJS server instance with debug enabled
const peerServer = ExpressPeerServer(server, {
    debug: true
});

// Mount the PeerJS server on the /peerjs route
app.use('/peerjs', peerServer);

app.use('/node_modules', express.static('node_modules'));



// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server on port 9000
server.listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
});

