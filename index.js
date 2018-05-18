'use strict'
const express = require("express");
const app = express();
const albums = require("./albums.js");
const Album = require('./models/Album.js');

app.set('port', /*process.env.PORT || */ 3000);
app.use(express.static(__dirname + '/public')); //set location for static files
app.use(require("body-parser").urlencoded({ extended: true })); //parse form submissions

let handlebars = require("express-handlebars");
app.engine("html", handlebars({ extname: 'html' }));
app.set("view engine", "html");

//send static file as response
app.get('/', (req, res) => {
    Album.find({}, function (err, albums) {
        if (err) return next(err);
        res.type('text/html');
        res.render('home', { albumList: albums });
      });
});


//send plain text response
app.get('/about', (req, res) => {
    res.type('text/html');
    res.send('About Page');
});

//GET handler
app.get('/delete', (req, res) => {
    Album.findOne({title: req.query.album}, (err, album) =>{
        if(err) return next(err);
        res.type('text/html');
        if(album !== null){
            Album.deleteOne({title: req.query.album}, (err) =>{
                let message = "deleted";
                if(err) {
                    message = "not deleted"
                };
                res.type('text/html');
                res.render('delete', {title: req.query.album, message: message});
            });
        }
        
        else {
            res.render('delete', {title: req.query.album, message: "not in database"});
        }
    }
    );
            

});

app.get('/detail', (req, res) => {
    Album.findOne({title: req.query.album.toLowerCase()}, (err, album) =>{
        if(err) return next(err);
        res.type('text/html');
        res.render('detail', {result: album, title: req.query.album});
    });
});

//POST handler
app.post('/detail', (req, res) => {
    Album.findOne({title: req.body.album}, (err, album) =>{
        if(err) return next(err);
        res.type('text/html');
        res.render('detail', {result: album, title: req.body.album});
    });
});

app.post('/add', (req, res) => {
    let obj = {
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year
    };
    Album.create(obj, (err, albums) =>{
        if(err) return next(err);
        res.type('text/html');
        res.render('add', {result: albums, title: req.query.album});
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