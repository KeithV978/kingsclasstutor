const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const parentSchema = new Schema({
	confirmEmail:{
		type: Boolean,
		default: false
	},
	signedInAs:{
		type: String,
		default: "parent"
	},
    email:{
        type: String,
	   required: [true, 'Pleaser enter a valid email address'],
        unique: true,
        trim: true,
        min: 9,
        lowercase: true
    },
    password:{
        type: String,
        required: [true, 'Pleaser Enter A Password'],
        min: [6, 'Password must be at least 6 characters'],
        select: false
    },
	firstName:{
		type: String,
		trim: true,
		min: 3
	 },
	 lastName:{
		type: String,
		trim: true,
		min: 3
	 }, 
		street: {
		    type: String, 
		    min: 3
		},
		city: {
		    type: String, 
		    min: 3
		},
		_state: {
		    type: String, 
		    min: 3
		},
	phone:{
		type: Number,
		trim: true,
		min: 11
	}
},
{
	timestamps: true
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;