'use strict'
const express = require("express");
const app = express();
const albums = require("./albums.js");
const Album = require('./models/Album.js');
let bodyParser = require("body-parser");

app.set('port', /*process.env.PORT || */ 3000);
app.use(express.static(__dirname + '/public')); //set location for static files
app.use(require("body-parser").urlencoded({ extended: true })); //parse form submissions
app.use(bodyParser.json());

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



//API ADD ROUTE
app.post('/api/album/add/', (req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body._id) { // insert new document
        let album = new Album({title:req.body.title,artist:req.body.artist,year:req.body.year});
        album.save((err,newAlbum) => {
            if (err) return next(err);
            console.log(newAlbum)
            res.json({updated: 0, _id: newAlbum._id});
        });
    } else { // update existing document
        Album.updateOne({ _id: req.body._id}, {title:req.body.title, artist: req.body.artist, year: req.body.year }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
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


