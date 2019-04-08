const siege = require('siege');

siege(__dirname + '/app.js')
    .on(3000)
    .for(100000).times
    .get('/heroes')
    .attack();