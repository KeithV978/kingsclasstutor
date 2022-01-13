const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    class:{
        type: String,
        required: true,
        trim: true,
    },
    age:{
        type: Number,
        trim: true
    },
    subjects:[{
        subject: {type: String, trim: true}
    }],
    days_of_classes:[
        {type: String,  trim: true} 
    ],
    duration:{
        type: String,  trim: true
    }
},
{
timestamps: true,
});

const User = mongoose.model('Student', studentSchema);

module.exports = Student;