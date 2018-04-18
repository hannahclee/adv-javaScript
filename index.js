
var http = require("http"); 
var albums = require("./albums.js");
http.createServer(function(req,res) {
    console.log('url ' + req.url);
  var parts = req.url.toLowerCase().split('?');
  var path = parts[0];
if (!path.startsWith('/favicon')){
    
    
  var query = parts[1];
    console.log('query ' + query);
  
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
          console.log(albums.getAlbum(value));
      res.write("The albums you selected is: " + 
                JSON.stringify(albums.getAlbum(value)));
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
