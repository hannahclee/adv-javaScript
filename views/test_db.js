'use strict'
const Album= require('../models/Album.js');

Album.count((err,result)=>{
    console.log(result);
});