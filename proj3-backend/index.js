const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const app = express();


app.use(express.static(path.join(__dirname, '../proj3-frontend/assets')));
app.use(express.static(path.join(__dirname, '../proj3-frontend/assets/maps')));
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

app.get('/otherworld', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/otherworld.html'));
});

app.get('/writepost', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/writepost.html'));
});

app.get('/writeotherpost', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/writeotherpost.html'));
});

app.get('/viewpost', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/viewpost.html'));
});

app.get('/choosegame', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/choosegame.html'));
});

app.get('/egggame', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/egggame.html'));
});

app.get('/dodgegame', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/dodgegame.html'));
});

app.get('/swipegame', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/swipegame.html'));
});

app.get('/tetrisgame', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/tetrisgame.html'));
});

app.get('/stackgame', (req, res) => {
    console.log(`Get Request to ${req.url}`);
    res.sendFile(path.join(__dirname, '../proj3-frontend/html/stackgame.html'));
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