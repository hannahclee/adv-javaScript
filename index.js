'use strict'
const express = require("express");
const app = express();
const albums = require("./albums.js");
app.set('port', /*process.env.PORT || */ 3000);
app.use(express.static(__dirname + '/public')); //set location for static files
app.use(require("body-parser").urlencoded({ extended: true })); //parse form submissions

let handlebars = require("express-handlebars");
app.engine("html", handlebars({ extname: 'html' }));
app.set("view engine", "html");

//send static file as response
app.get('/', (req, res) => {
    res.type('text/html');
    res.render('home', { albums: albums.getAllAlbums() });
});

//send plain text response
app.get('/about', (req, res) => {
    res.type('text/html');
    res.send('About Page');
});

//GET handler
app.get('/delete', (req, res) => {
    let result = albums.deleteAlbum(req.query.album);
    let message = "deleted"
    if(!result){
        message = "not deleted"
    };
    res.render('delete', { 
        title: req.query.album, 
        message: message });
});

app.get('/detail', (req, res) => {
    console.log(req.query)
    var found = albums.getAlbum(req.query.album);
    res.render("detail", { title: req.query.album, 
        result: found, 
     });
});

//POST handler
app.post('/detail', (req, res) => {
    let found = albums.getAlbum(req.body.album);
    res.render("detail",
        {
            title: req.body.album,
            result: found
        });
});

//define 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});


app.listen(app.get('port'), () => {
    console.log('Express started');
});



/*var http = require("http"); 

http.createServer(function(req,res) {
  var parts = req.url.toLowerCase().split('?');
  var path = parts[0];
if (!path.startsWith('/favicon')){ 
  var query = parts[1];
  
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Our Albums: ' + JSON.stringify(albums.getAllAlbums()));
      res.end('');
      break;
          
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page');
      break;    
      
    case '/get':
      var value = query.split('=')[1];
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(albums.getAlbum(value)));
      res.end('');
      break;    
      
    case '/delete':
        var value = query.split('=')[1];
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(albums.deleteAlbum(value)));
      res.end('');
      break;
          
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}
}).listen(process.env.PORT || 3000);
*/