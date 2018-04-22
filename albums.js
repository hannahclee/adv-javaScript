let albums = [
{ title : "Blue", artist : "Joni Mitchell", year : "1971" },
{ title : "Lemonade", artist : "Beyonce", year : "2016" },
{ title : "Aqualung", artist : "Jethro Tull", year : "1970" },
{ title : "Artpop", artist : "Lady Gaga", year : "2013" },
{ title : "Help", artist: "The Beatles", year : "1965" }
];

exports.getAllAlbums = ()=>{
    return albums;
};

exports.deleteAlbum = (title)=>{
        let result = albums.findIndex(
        (album)=>
     title === album.title.toLowerCase()
                );
    console.log(result);
    albums.splice(result, result);

    if (result < 0){
        return 'Album titled: ' + title + ' not removed';
    }else{
        return 'Album titled: ' + title + ' has been removed';
        
    };

};
    
    

exports.getAlbum = (title)=>{
    let result = albums.find( 
        (album)=>
     title === album.title.toLowerCase()
                );
    if (result === undefined){
        return 'We do not have that album';
    }
    return result;
   
};
