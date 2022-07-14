const express = require('express');
const app = express();

app.all('*', (req, res) => {
    res.redirect('https://' + req.headers.host + req.url);
    console.log('redirected to https://' + req.headers.host + req.url);
});

app.listen(80, () => {
    console.log('HTTP Server running on port 80');
});