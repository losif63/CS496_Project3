const fs = require('fs');
// const http = require('http');
const https = require('https');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log(req.protocol);
    res.send('Hello World!');
});


const privateKey1 = fs.readFileSync('/etc/letsencrypt/live/www.mdcmpwrld.ga/privkey.pem', 'utf8');
const certificate1 = fs.readFileSync('/etc/letsencrypt/live/www.mdcmpwrld.ga/cert.pem', 'utf8');
const ca1 = fs.readFileSync('/etc/letsencrypt/live/www.mdcmpwrld.ga/chain.pem', 'utf8');
const credentials = {
    key: privateKey1,
    cert: certificate1,
    ca: ca1
}

// const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// httpServer.listen(80, () => {
//     console.log('HTTP Server running on port 80');
// });

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});