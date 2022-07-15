const path = require('path');
const fs = require('fs');

const fileNames = fs.readdirSync('./src').reduce((acc, v) => ({ ...acc, [v]: `./src/${v}` }), {});

module.exports = {
    mode: 'development',
    entry: fileNames,
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]'
    }
}