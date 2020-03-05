
var connect = require('connect');
var serveStatic = require('serve-static');
//var app = connect().use(connect.static(__dirname + '/public'));
connect().use(serveStatic(__dirname+'/src')).listen(8080, function(){
    console.log('Server running on 8080...',__dirname+'/src');
});

/*

npm install connect
npm install serve-static

*/



// var connect = require("connect");
//
// var app = connect().use(connect.static(__dirname + ''));
//
// app.listen(8180);


// npm install webpack -g
// webpack -p
