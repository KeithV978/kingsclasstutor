const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schoolSchema = new Schema({
	confirmEmail:{
		type: Boolean,
		default: false
	},
	userType:{
		type: String,
		default: "school"
	},
    schoolEmail:{
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
	 schoolAddress:{
		 type: String,
		 min:10
	 },	
	 schoolEmblem:{
		type: String,
		min:10
	},
	isAdmin:{
		type: Boolean,
		default: false
	}
},{timestamps: true})


const School = mongoose.model('School', schoolSchema);

module.exports = School;