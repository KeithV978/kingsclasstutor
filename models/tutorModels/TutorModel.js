const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const Tutor = mongoose.model('Tutor',
 new mongoose.Schema({
	confirmEmail:{
		type: Boolean,
		default: false
	},
    userType:{
		type: String,
		default: "tutor"
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
	 classes_i_teach:{
		 type: Array
	 },
	resume:{
	    type: String,
	},
	rating:{
	    type: Number,
	    default: 2
	},
	can_teach_adults:{
		type: Boolean,
		enum: [true, false]
	},
	full_time:{
		type: Boolean
	},
	part_time:{
		type: Boolean
	},
	school_teacher:{
		type: Boolean
	},
	private_tutor:{
		type: Boolean
	},
	profile_photo:{
	    type: String
	},
	date_of_birth:{
	    type: Date
	},
	department:{
	    type: String
	},
	currently_hired:{
	    type: Boolean,
	    default: false
	},
	parentHires:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "ParentService"
	}],
	schoolHires:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "SchoolService"
	}
    }
}, 
{
    timestamps: true,
}));

module.exports = Tutor;