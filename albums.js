let albums = [
{ title : "Blue", artist : "Joni Mitchell", year : "1971" },
{ title : "Born This Way", artist : "Lady Gaga", year : "2011" },
{ title : "Mona Bone Jakon", artist : "Cat Stevens", year : "1970" },
{ title : "Hounds of Love", artist : "Kate Bush", year : "1985" },
{ title : "Crime of the Century", artist: "Supertramp", year : "1974" }
];

exports.getAllAlbums = ()=>{
    return albums;
};

exports.deleteAlbum = (title)=>{
    let result = albums.findIndex(function(title){return title});
    albums.splice(result, result);
    return title + ' removed';
    

    
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
