let mongoose = require("mongoose");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
let connectionString = "mongodb://beyonce:lem0nade@ds255308.mlab.com:55308/hannahclee";
mongoose.connect(connectionString);

let conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

// define Book model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 title: { type: String, required: true },
 artist: String,
 year: String
}); 

module.exports = mongoose.model('Album', mySchema);