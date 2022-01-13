const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const emailValidator = (email) => {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email);
// };

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 9,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    confirmEmail:{
        type: String,
        default: false
    },
    password:{
        type: String,
        required: [true, 'Pleaser Enter A Password'],
        min: [6, 'Password must be at least 6 characters'],
        select: false
    },
    name:{
           firstname:{
              type: String,
              required: true,
              trim: true,
              min: 3
          },
          lastname:{
              type: String,
              trim: true,
              min: 3
          }
      } 
}, 
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;