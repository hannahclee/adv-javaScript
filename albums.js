let albums = [
    { title: "Blue", artist: "Joni Mitchell", year: "1971" },
    { title: "Lemonade", artist: "Beyonce", year: "2016" },
    { title: "Aqualung", artist: "Jethro Tull", year: "1970" },
    { title: "Artpop", artist: "Lady Gaga", year: "2013" },
    { title: "Help", artist: "The Beatles", year: "1965" }
];

exports.getAllAlbums = () => {
    return albums;
};

exports.deleteAlbum = (title) => {
<<<<<<< HEAD
    let result = albums.findIndex((album) => {
=======
    let result = albums.findIndex((album) =>{
>>>>>>> 797260cd80526855f8f29e76ea7ae711b99ff899
        return title.toLowerCase() === album.title.toLowerCase()
    })
    if (result > -1) {
        albums.splice(result, 1);
        return true;
<<<<<<< HEAD
=======
    }
    return false;
};



exports.getAlbum = (title) => {
    let result = albums.find(
        (album) =>
            title.toLowerCase() === album.title.toLowerCase()
    );
    if (result === undefined) {
        return 'We do not have that album';
>>>>>>> 797260cd80526855f8f29e76ea7ae711b99ff899
    }
    return false;
};



exports.getAlbum = (title) => {
    let titleLc = title.toLowerCase();
    let result = albums.find(
        (album) =>
            titleLc === album.title.toLowerCase()
    );
    return result;

};

exports.addAlbum = (entry) => {
    let titleLc = entry.title.toLowerCase();
    let result = albums.find(
        (album) =>
            titleLc === album.title.toLowerCase()
    );
    if (!result) {
        if (true || validateEntry(entry)) {
            albums.push(entry);
            return true;
        }

    }
    return false;
}

function validateEntry(entry){
    let keys = Object.keys(entry);
    if (keys.length !== 3){
        return false;
    }
    if (keys.find("title") && keys.find("artist") && keys.find("year")){
        return true;
    }
    return false;
}