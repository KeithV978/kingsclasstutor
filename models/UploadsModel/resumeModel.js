var mongoose = require('mongoose');
  
var resumeSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
   
  
module.exports = new mongoose.model('Resume', resumeSchema);