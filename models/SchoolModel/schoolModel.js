const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const School = mongoose.model('School',
 new mongoose.Schema({
	confirmEmail:{
		type: Boolean,
		default: false
	},
	userType:{
		type: String,
		default: "school"
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
    profile:{
	schoolName:{
		type: String,
		trim: true,
		min: 10
	 },
	 proprietorsName:{
		 type: String,
		 trim: true,
		 min: 6
	 },
	 address:{
		 street:{
			 type: String
		 },
		 city:{
			 type: String
		 },
		 _state:{
			 type: String
		 }		 
	 },
	 phone:{
		 type: Number
	 },	
	 schoolEmblemPhoto:{
		type: String
	}
    }
},{timestamps: true}))


module.exports = School;