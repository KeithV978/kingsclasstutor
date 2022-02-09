const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const Tutor = mongoose.model('Tutor',
 new mongoose.Schema({
	confirmEmail:{
		type: Boolean,
		default: false
	}, 
    email:{
        type: String
    },
    password:{
        type: String
    }, 
    profile:{
	profile_photo:{
	     data: Buffer,
          contentType: String
	},
	name:{
		firstName:{
		   type: String,
		   trim: true,
		   min: 3
	    },
	    lastName:{
		   type: String,
		   trim: true,
		   min: 3
	    }
	},
	address:{
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
	    },
	phone:{
	    type: Number,
	    trim: true,
	    min: 11
	},
	gender:{
	    type: String,
	    enum: ['male', 'female'], 
	},
	subjects:[{
	    subject:{
		   type: String,  
		   trim: true
	    },
	    experience:{
		   type: Number,  
			trim: true,
	    }
	 }],
	 classesITeach:{
		 type: Array
	 },
	resume:{
	    type: String,
	},
	rating:{
	    type: Number,
	    default: 2
	},
	canTeachAdults:{
		type: Boolean,
		default: false
	},
	fullOrPartTime:{
		type: String,
		enum: ["Full Time", "Part Time", "Both"]
	},
	schoolOrPrivateTutor:{
		type: String,
		enum: ["School Teacher", "Private Teacher", "Both"]
	},
	dateOfBirth:{
	    type: Date
	},
	department:{
	    type: String
	},
	currentlyHired:{
	    type: Boolean,
	    default: false
	},
	hires:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Services"
	}]
    }
}, 
{
    timestamps: true,
}));

module.exports = Tutor;