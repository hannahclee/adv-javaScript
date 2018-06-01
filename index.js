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
            if (err) return (err);
            res.render('home', {albums: JSON.stringify(albums)}); 
        });
    });

//send plain text response
app.get('/about', (req, res) => {
       res.type('text/html');
        res.send('About Page');
    });

//API route GET ALL ALBUMS
app.get('/api/albums', (req, res) => {
    Album.find({}, function (err, albums) {
        if (err) return (err);
        res.json(albums.map((results)=>{
            return{
                title: results.title,
                artist: results.artist,
                year: results.year
            }
        }));
      });
});

//GET handlers

//API route DELETE ALBUM
app.get('/api/delete/:title', (req, res) => {
    Album.findOne({title: req.params.title}, (err, album) =>{
        if(err) return next(err);
        if(album !== null){
            Album.deleteOne({title: req.params.title}, (err) =>{
                let message = "deleted";
                if(err) {
                    message = "not deleted"
                };
                res.json(album + message);
            });
        }
        
        else {
            res.json(album + "not in database");
        }
    }
    );
            

});

//API route GET ONE ALBUM
app.get('/api/album/:title', (req, res) => {
    Album.findOne({title: req.params.title}, (err, album) =>{
        if(err) return (err);
        res.json(album);
    });
});

//POST handler
// app.post('/detail', (req, res) => {
//     Album.findOne({title: req.body.album}, (err, album) =>{
//         if(err) return next(err);
//         res.type('text/html');
//         res.render('detail', {result: album, title: req.body.album});
//     });
// });


//API ADD ROUTE
app.get('/api/album/add/:title/:artist/:year', (req, res) => {
    let obj = {
        title: req.params.title,
        artist: req.params.artist,
        year: req.params.year
    };
    Album.create(obj, (err, album) =>{
        if(err) return (err);
        res.json(album);
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