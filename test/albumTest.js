const expect = require("chai").expect;
const albums = require("../albums");


describe("Album module", () => {
    it("returns requested album", function() {
      let result = albums.getAlbum("blue");
      expect(result).to.deep.equal({title: "Blue", artist:"Joni Mitchell", year:"1971"});
    });
    
    it("fails w/ invalid album", () => {
      let result = albums.getAlbum("fake");
      expect(result).to.be.undefined;
    });

    it("deletes requested album", function(){
        let myAlbum = {title: "Green", artist:"Bob", year:"3000"};
        albums.addAlbum(myAlbum);
        let result = albums.deleteAlbum(myAlbum.title);
        expect(result).to.be.true;
        
    });

    it("refuses to delete unknown album", function(){
        let result = albums.deleteAlbum("fake");
        expect(result).to.be.false;
 
    });

    it("adds requested album", function(){
        let myAlbum = {title: "Mocha Test Album", artist:"Chai", year:"3000"};  
        albums.deleteAlbum(myAlbum.title);   
        let result = albums.addAlbum(myAlbum);
        expect(result).to.be.true;
 
    });

    it("fails to add an album a second time", function(){
        let myAlbum = {title: "Mocha Test Album", artist:"Chai", year:"3000"};  
        albums.deleteAlbum(myAlbum.title);   
        let result1 = albums.addAlbum(myAlbum);
        let result2 = albums.addAlbum(myAlbum);
        expect(result1).to.be.true;
        expect(result2).to.be.false;
 
    });

   });
