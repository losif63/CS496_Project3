const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const app = express();


app.use(express.static(path.join(__dirname, '../proj3-frontend/assets')));
app.use(express.static(path.join(__dirname, '../proj3-frontend/html')));
app.use(express.static(path.join(__dirname, '../proj3-frontend/css')));
app.use(express.static(path.join(__dirname, '../proj3-frontend/dist')));

const profilePicRouter = require('./profilepicrouter');
app.use('/profilepic', profilePicRouter);


app.get('/', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/index.html'));
});

app.get('/login', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/login.html'));
});

app.get('/signup', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/signup.html'));
});

app.get('/myworld', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/myworld.html'));
});

const privateKey1 = fs.readFileSync('/etc/letsencrypt/live/www.mdcmpwrld.ga/privkey.pem', 'utf8');
const certificate1 = fs.readFileSync('/etc/letsencrypt/live/www.mdcmpwrld.ga/cert.pem', 'utf8');
const ca1 = fs.readFileSync('/etc/letsencrypt/live/www.mdcmpwrld.ga/chain.pem', 'utf8');
const credentials = {
    key: privateKey1,
    cert: certificate1,
    ca: ca1
}

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});